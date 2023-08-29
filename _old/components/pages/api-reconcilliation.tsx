import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { Heading } from '@keystone-ui/core';
import useSWR from 'swr'
import { AppResponse, AppResults, AppOffer, Promotion, PromotionData, PromoCategory, PromoSplitDetails, TableProps, ApiArray, ApiArrayItem, TempAppOffer } from '../interfaces/reconcilliation';
import ApiTable from '../components/api-table';
import { useEffect, useState } from 'react';
import bubbleData from "../public/files/json/bubble.json";
import nbData from "../public/files/json/networkb.json";

export default function ApiReconciliation() {
    return (
        <>
            <PageContainer header={<Heading type="h3">API Reconcilliation</Heading>}>
                <ApiDisplay></ApiDisplay>
            </PageContainer>
        </>
    )
}

function ApiDisplay() {
    
    const combinedArray = getArrData(bubbleData, nbData)


    // console.log("Bubble", bubbleData)
    // console.log("NB", nbData)
    // console.log(combinedArray)
 

    return (
        <>
        {combinedArray && <ApiTable tableProps={combinedArray.dataArr}></ApiTable>}
        {/* {combinedArray && <ApiTable tableProps={combinedArray.singleArr}></ApiTable>} */}
        </>
    )
}

const getArrData = (bubbleData: TempAppOffer[], nbData:Promotion[]) => {
    if (!bubbleData || !nbData) {
        return null;
    }
    const dataArr: ApiArray[] = []
    const singleArr: ApiArray[] = []

    bubbleData.map(offer => {
        dataArr.push({Id: parseInt(offer['nimda id']), items: [{"Name": offer.brand_name, "Discount": offer.discount_percentage ? parseFloat(offer.discount_percentage).toFixed(2)+"%" : "£"+offer.discount_amount, "Expires": offer.expiry_date.split('T')[0], Source: "Bubble"} ]})
    })

    nbData?.map(promos => {
        promos["promo-data"].map((promo, i: number) => {
            let promoExpiry: string = promo['expiry-date']
            dataArr.forEach((entry, i) => {

                if(promo['promo-id'] == entry.Id){
                    const split = promo['splits-details'][0]
                    dataArr[i].items.splice(i, 0, {"Name": promo.name, "Discount": split['gross-user-share'].replace("&pound;", "£"), "Expires": promoExpiry, Source: "Network B" })
                    
                } 
                else {
                    promo['splits-details'].map((split) => 
                        singleArr.push({"Id": promo['promo-id'], items: [{"Name": promo.name, "Discount": split['gross-user-share'].replace("&pound;", "£"), "Expires": promoExpiry, Source: "Network B"}] }),
                    )
                }
            })
        })
    })
    return (
        console.log(nbData),
        {dataArr}
    );

}
import { Router } from "@keystone-6/core/dist/declarations/src/admin-ui/router";

const router = Router();

router.post('/api/user-signin', async (req, res) => {
  // Get the data that was sent in the POST request.
  const postData = req.body;


  // Respond to the request with a success message.
  res.status(200).send('Logged in!');
});

export default router;
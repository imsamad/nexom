import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  if (req.method === "POST") { 
    let { jwt, user } = req.body;
    user = {
      isLoggedIn: true,
      jwt,
      username: user.username,
      email: user.email,
    };
    req.session.set("nextecomm", user);
    await req.session.save();
    res.status(200).end();
  }
  if (req.method === "GET") {
    const user = req.session.get("nextecomm");
    if (user) { 
      res.json({ isLoggedIn: true, ...user });
    } else {
      res.json({ isLoggedIn: false });
    }
  }
});

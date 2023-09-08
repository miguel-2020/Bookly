export default function logout(req,res){
    res.clearCookie("token");
    res.status(204)
    res.end()
}
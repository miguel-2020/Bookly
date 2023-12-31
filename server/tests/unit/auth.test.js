import base64 from "base-64";
import auth from "../../src/auth/auth";


describe("createToken",()=>{
    it("should return a signed token",()=>{
        const user = {id:1,role:"member",username:"maria"}
        auth.createToken(user,(_,token)=>{
            expect(token).toBeTruthy();
        })
    })



    it("Should throw if any of the properties: id,role,username is missing",()=>{
        const args = [
            {role:"member",username:"maria"},
            {id:1,username:"maria"},
            {id:1,role:"member"}
    
        ]

        args.forEach((a)=>{
           auth.createToken(a,(err)=>{
            expect(err).toThrow()
           })
        })
    })
})

describe("createHashPassword",()=>{
    it("should return a hashed text",async ()=>{
        const hash = await auth.createHashPassword("hello")
        expect(hash.length).toBeGreaterThan(5);
    })
})

describe("decodeBase64Header",()=>{
    const person = {name:"juan",password:"123a",role:"member"}

    const request = {
      headers:{
        authorization: `Basic ${base64.encode(`${person.name}:${person.password}:${person.role}`)}`
  
      }
    }
  
    it("should return an array containing the decoded username and password if valid inputs",async ()=>{
        const outcome = await auth.decodeBase64Header(request)
        expect(outcome[0]).toEqual(person.name)
    })


    it("should return an array containing an error if invalid inputs",async ()=>{
         const person = {name:"",password:"",role:""}
         let error = ["error",Error("missing credentials")]

    const request = {
        headers:{
          authorization: `Basic ${base64.encode(`${person.name}:${person.password}:${person.role}`)}`
    
        }
      }
      try {
        const outcome = await auth.decodeBase64Header(request)
      } catch (error) {
        expect(error[1].message).toEqual(expect.stringContaining("missing credentials"))
      }
       

    })
    
   
})





import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../model/token.js"

dotenv.config()

export const signupUser = async(request, response)=>{
  try {
    // const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(request.body.password, 10 )
    const user = {username: request.body.username, name: request.body.name, password: hashedPassword}
    const newUser = new User(user)
    await newUser.save()
    response.status(200).json({msg: "signup successful"})
  } catch (error) {
    response.status(500).json({msg:"Error while signing up"})
  }

}

export const loginUser = async(request, response)=>{
  let user = await User.findOne({username: request.body.username})
  if(!user){
    return response.status(404).json({msg:"User not found"})
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password)
    if(match){
      const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn: "15m"})
      const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY) 
      const newToken = new Token({token: refreshToken})
      await newToken.save()
      return response.status(200).json({msg: "Login successful", accessToken, refreshToken, username:user.username, name:user.name })
    } else {
      return response.status(404).json({msg: "Incorrect password or password not found"})
    }
    
  } catch (error) {
    return response.status(500).json({msg:"Error while logging in"})
    
  }
}
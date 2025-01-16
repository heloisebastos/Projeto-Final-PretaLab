import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Conectado ao banco de dados")
    } catch (error) {

        console.log("Erro ao conectar ", error)

    }
}
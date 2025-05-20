import { UserRole } from "src/schemas/User.schema";

declare global{
    namespace Express{
        interface User{
            role:UserRole,
            sub:string
        }
    }
}
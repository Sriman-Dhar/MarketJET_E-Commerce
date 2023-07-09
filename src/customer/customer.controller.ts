import { Controller } from "@nestjs/common";

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {
       
        ////Index
        @Get('/index')
        getIndex(): any {
            return this.customerService.getIndex();
        }

        
    }
}
@Injectable()
export class CustomerService {
    
    constructor () {}

    async getIndex(): Promise<CustomerEntity[]> {
        return "Welcome Customer!!";
    }
}
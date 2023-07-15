import { Body, Controller, Delete, Get, Param, Query, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { CustomerService } from "./customer.sevice";
import { CustomerDetailsDTO, CustomerResetPassDTO, customerDTO, customerLoginDTO } from "./customer.dto";
import { SessionGuard } from "./session.guard";
import { ProductEntity } from "src/product/product.entity";
import { ReviewDTO } from "src/review/review.dto";

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
       
        //Index
        @Get('/index')
        @UseGuards(SessionGuard)
        getIndex(@Session() session): any {
            return "WELCOME";
        }

        @Post('/signup')
        @UseInterceptors(FileInterceptor('image', {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000 },
            storage: diskStorage({
                destination: './profileImages',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }))
        @UsePipes(new ValidationPipe())
        signUp(@Body() customerData: customerDTO, @UploadedFile() imageobj: Express.Multer.File) {
            customerData.filenames = imageobj.filename;
            return this.customerService.signUp(customerData);
        }
    

        @Post('/login')
        async login(@Body() data: customerLoginDTO, @Session() session) {
            if(await this.customerService.login(data) == true) {
                session.email = data.email;
                return "Welcome to Profile!";
            }
            else{
                return "Login Failed!! Try Again.."
            }
        }

        @Post('/imgUpload')
        @UseInterceptors(FileInterceptor('profileImg', {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        
        limits: {fileSize: 50000},
        storage: diskStorage({
            destination: './profileImg',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
        }
        ))
    
        uploadedFile(@UploadedFile() imgObj: Express.Multer.File): object {
            return ({message: "Profile Picture Uploaded!" });
        }

        @Put('/updateDetails')
        @UseGuards(SessionGuard)
        updateDetails(@Body() data: CustomerDetailsDTO, @Session() session): object {
            return this.customerService.updateDetails(session.email, data);
        }
    
        @Put('/resetPassword')
        @UseGuards(SessionGuard)
        updatePass(@Body() data: CustomerResetPassDTO, @Session() session): object {
            return this.customerService.updatePass(session.email, data);
        }

        @Post('/addProduct')
        @UsePipes(new ValidationPipe())
        @UseGuards(SessionGuard)
        addProduct(@Body() product): Promise<ProductEntity[]> {
            return this.customerService.addProduct(product);
        }

        @Get('/search')
        @UseGuards(SessionGuard)
        searchProduct(@Query() qry: any): object {
        return this.customerService.searchProduct(qry.name);
        }

        @Delete('/customer/:productName')
        @UseGuards(SessionGuard)
        deleteProductByName(@Param('productName')productName) {
            console.log(productName);
            return this.customerService.deleteProductByName(productName);
        }

        @Get('/totalcost')
        @UseGuards(SessionGuard)
        async getTotalCost(): Promise<number>{
            return this.customerService.getTotalCost();
        }

        @Get('/quantity')
        @UseGuards(SessionGuard)
        async getProductQuantity(): Promise<number>{
            return this.customerService.getProductQuantity();
        }

        @Post('/review')
        @UseGuards(SessionGuard)
        async submitReview(@Body() reviewData: ReviewDTO, @Session() session): Promise<void> {
        const email = session.email; 
        await this.customerService.submitReview(email, reviewData);
        }

        
    }

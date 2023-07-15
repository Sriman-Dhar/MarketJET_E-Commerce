import { Body, Controller, Delete, Get, Param, Query, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ProductEntity } from "src/product/product.entity";
import { ProductDTO } from "src/product/product.dto";
import { ShopDTO } from "src/shop/shop.dto";
import { SellerDTO, SellerInfoDTO, SellerLoginDTO, SellerResetPassDTO } from "./seller.dto";
import { SessionGuard } from "./session.guard";

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    ////Seller Index
    @Get('/s_index')
    @UseGuards(SessionGuard)
    getIndex(@Session() session): any {
        //return this.sellerService.getIndex();
        return "Welcome Seller!!";
    }

    ////Add Product Into Database
    @Post('/add_product')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    addProduct(@Body() product) {
        return this.sellerService.addProduct(product);
    }

    ////Upload Product Image
    @Post('/uploads')
    @UseInterceptors(FileInterceptor('productImage', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },

        limits: { fileSize: 500000 },
        storage: diskStorage({
            destination: './ProductImages',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }
    ))
    @UseGuards(SessionGuard)
    uploadedFile(@UploadedFile() prImageobj: Express.Multer.File): object {
        return ({ message: "Product Image Uploaded!" });
    }

    ////Get Product Image
    @Get('/get_product_image/:name')
    getProductImage(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './ProductImages' })
    }

    ////Add Shop Details
    @Post('/add_shop')
    @UseGuards(SessionGuard)
    addShop(@Body() shop) {
        return this.sellerService.addShop(shop);
    }

    ////Delete Product Details
    @Delete('/seller/:productId')
    @UseGuards(SessionGuard)
    deleteProductById(@Param('productId') productId) {
        console.log(productId);
        return this.sellerService.deleteProductById(productId);
    }

    ////Update Product Details
    @Put('/update_product_details/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateProductbyId(@Param() id: number, @Body() data: ProductDTO): object {
        return this.sellerService.updateProductbyId(id, data);
    }

    ////Update Shop Details
    @Put('/update_shop_details/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateShopbyId(@Param('id', ParseIntPipe) id: number, @Body() data: ShopDTO): object {
        return this.sellerService.updateShopbyId(id, data);
    }

    ////Get Product Details
    @Get('get_product')
    @UseGuards(SessionGuard)
    getProductDetails() {
        return this.sellerService.getProductDetails();
    }

    ////Search Product
    @Get('/search')
    @UseGuards(SessionGuard)
    searchProduct(@Query() qry: any): object {
        return this.sellerService.searchProduct(qry.id, qry.name);
    }

    ////Sign Up
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
            destination: './sellerImages',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }))
    @UsePipes(new ValidationPipe())
    signUp(@Body() sellerData: SellerDTO, @UploadedFile() imageobj: Express.Multer.File) {
        sellerData.filenames = imageobj.filename;
        return this.sellerService.signUp(sellerData);
    }

    ////Sign In
    @Post('/signin')
    async signIn(@Body() data: SellerDTO, @Session() session) {
        
        if(await this.sellerService.signIn(data) == true) {
            session.email = data.email;
            return "Login Succesfull!!";
        }else {
            return "Login Failed!!";
        }
    }

    ////Update Profile Information
    @Put('/update_info')
    @UseGuards(SessionGuard)
    updateInfo(@Body() data: SellerInfoDTO, @Session() session): object {
        return this.sellerService.updateInfo(session.email, data);
    }

    ////Reset Password
    @Put('/reset_password')
    @UseGuards(SessionGuard)
    updatePass(@Body() data: SellerResetPassDTO, @Session() session): object {
        return this.sellerService.updatePass(session.email, data);
    }
}
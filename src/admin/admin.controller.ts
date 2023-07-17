import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards, NotFoundException, HttpStatus, Delete } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage} from "multer";
import session = require("express-session");
import { SessionGuard } from "./session.gaurd";
import { AdminEntity } from "./admin.entity";
import { ProductDTO } from "../product/product.dto";
import multer = require("multer");
import { ProductEntity } from "../product/product.entity";


@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }
    @Get('/index')
    @UseGuards(SessionGuard)
    getIndex(@Session() session): any {
        return this.adminService.getIndex();
    }
    @Post('/addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() data: AdminDTO): object {
        return this.adminService.addAdmin(data);
    }
    @Put('/updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param('id', ParseIntPipe) id: number, @Body() data: AdminUpdateDTO): object {
        return this.adminService.updateAdminById(id, data);
    }

    @Get('/search/:id')
    async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {

        const res = await this.adminService.getAdminById(id)
        if (res !== null) {
            console.log(res);
            return res;
        }
        else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Admin not found"
            });
        }
    }

    @Get('/search')
    getAdminbyIDAndName(@Query() qry: any): object {

        return this.adminService.getAdminbyIDAndName(qry.id, qry.name);
    }

    @Post(('upload'))
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './images/',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
        console.log(myfileobj);
        return ({ message: "file uploaded" });
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './images' })
    }

    @Post('/addproduct')
    @UsePipes(new ValidationPipe())
    addProduct(@Body() product) {
        return this.adminService.addProduct(product);
    }

    @Get('/getproduct/:adminid')
    getProductsByAdmin(@Param('adminid', ParseIntPipe) adminid: number) {

        return this.adminService.getProductsByAdmin(adminid);
    }

    @Get('getproduct')
    getAllProducts() {
        return this.adminService.getAllProducts();
    }
    @Get('/searchproduct/')
    searchProduct(@Query() qry: any): object {
        return this.adminService.searchProduct(qry.id, qry.name);
    }

    @Get('/searchproduct/:id')
    async searchProductbyId(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {

        const res = await this.adminService.searchProductbyId(id)
        if (res !== null) {
            console.log(res);
            return res;
        }
        else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Admin not found"
            });
        }
    }
    @Delete('/deleteproduct/:id')
    deleteProductById(@Param('id') id) {
        console.log(id);
        return this.adminService.deleteProductById(id);
    }
    @Put('/updateproduct/:id')
    @UsePipes(new ValidationPipe())
    updateProductbyId(@Param() id: number, @Body() data: ProductDTO): object {
        return this.adminService.updateProductbyId(id, data);
    }
    @Post('/signup')
    @UsePipes(new ValidationPipe)
    signup(@Body() mydata: AdminDTO):object {
        console.log(mydata);
        return this.adminService.signup(mydata);
    }
    @Post('/signin')
    signIn(@Body() data: AdminDTO, @Session() session) {

        if (this.adminService.signIn(data)) {
            session.email = data.email;
            return "You have successfully logged in";
        }
        else {

            return false;
        }
        // return this.adminService.signIn(data);
    }

    @Get('getimagebyadminid/:adminId')
    async getimagebyid(@Param('adminId', ParseIntPipe) adminId: number, @Res() res) {
        const filename = await this.adminService.getimagebyadminid(adminId);
        res.sendFile(filename, { root: './images' })

    }




}





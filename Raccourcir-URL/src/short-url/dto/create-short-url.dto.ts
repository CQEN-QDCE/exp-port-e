import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateShortUrlDto {

    @IsString()
    readonly originalUrl: string; 

    @IsString()
    uniqueId: string; 

    @IsNumber()
    readonly numberClicks: number; 

    @IsString()
    readonly user: string; 

}

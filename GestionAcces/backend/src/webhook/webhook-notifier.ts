import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";

export class WebHookNotifier {

    private urls: string[] = [];

    private httpService: HttpService;

    private throwOnError: boolean;

    constructor(httpService: HttpService, urls: string | string[] = [], throwOnError: boolean = false) { 
        if (!urls) return;
        this.httpService = httpService;
        this.throwOnError = throwOnError;
        if (! Array.isArray(urls)) {
            this.urls.push(urls);
        } else {
            this.urls = urls;
        }
    }

    async notify(topic: string, payload: any): Promise<void> {
        console.log('urls: ' + this.urls);
        for (let url of this.urls) {
            await firstValueFrom (
                this.httpService.post(url + '/topic/' + topic + '/', payload).pipe(
                  catchError((error: any) => {
                    if (this.throwOnError) {
                        console.log(error);
                        return error;
                    } else {
                        throw error;
                    }
                  }),
                ),
            );
        }
    }
}
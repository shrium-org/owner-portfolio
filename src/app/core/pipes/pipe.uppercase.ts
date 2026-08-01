import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
    name: 'textcase'
})
export class TextCasePipe implements PipeTransform {
   
   
    transform(value: any, caseType: "upper" | "lower" | "title"): any   {
        
        if(caseType === 'upper'){
            return value.toUpperCase();
        }
        else if(caseType   === 'lower'){
            return value.toLowerCase();
        }
        else if(caseType === 'title'){
            return value.replace(/\w\S*/g, (txt: string) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        else{
            return value;
        }

    }

}

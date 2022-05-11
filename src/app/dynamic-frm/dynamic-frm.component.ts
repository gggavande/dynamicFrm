import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-frm',
  templateUrl: './dynamic-frm.component.html',
  styleUrls: ['./dynamic-frm.component.css']
})
export class DynamicFrmComponent implements OnInit {
  formsData : any;
  dynamicFrm : any;
  isJsonSubmit : boolean = false;
  submitJson : any;
  file : any;
  formIsSubmit : boolean = false;

  constructor(private http : HttpClient,private fb: FormBuilder,) { }

  ngOnInit(): void {
    // this.fetchJson();
    this.dynamicFrm = this.fb.group({});
    this.submitJson = this.fb.group({
      jsonFile: ['',Validators.required],
    });
  }

  fetchJson(){
    this.http.get('./assets/drug2.json').subscribe((response:any) => {
      response = response.fields;
      // console.log(response);
      response = response.sort((a:any, b:any) => (a.order > b.order) ? 1 : -1);
      this.formsData = response;
      console.log(response);
      response.forEach((item:any) => {
        this.dynamicFrm.addControl(item.key,this.fb.control('',Validators.required));
      });
    })
  }

  fileChanged(e:any){
    this.file = e.target.files[0];
  }

  onSubmit(form: FormGroup){
    this.formIsSubmit = true;
    console.log(form.value);
    console.log(this.dynamicFrm);
  }

  onSubmitJson(form: FormGroup){
    console.log(form.value);
    console.log(this.submitJson);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let temp : any = fileReader.result;
      let temp1 = JSON.parse(temp);
      this.formsData = temp1.fields;
      this.formsData.forEach((item:any) => {
        this.dynamicFrm.addControl(item.key,this.fb.control(''));
        if(item.isRequired == true){
          this.dynamicFrm.controls[item.key].setValidators([Validators.required]);
        }
      });
      this.isJsonSubmit = true;
    }
    fileReader.readAsText(this.file);
  }

}

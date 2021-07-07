import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchDocumentModel } from '../models/research.document.model';
import { ResearchFileModel } from '../models/research.file.model';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research-document-form',
  templateUrl: './research-document-form.component.html',
  styleUrls: ['./research-document-form.component.scss']
})
export class ResearchDocumentFormComponent implements OnInit {

   researchForm: FormGroup;
   uploadedFiles: any[] = [];
   id: any;
   constructor(private researchService: ResearchService,
       private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     this.initForm();
    this.id = this.route.snapshot.params['id'];
    if (this.id !== '0') {
       this.researchService.getResearchDocument(this.id).subscribe(res => {
          this.setForm(res as ResearchDocumentModel);
       });
    }

  }

  initForm() {
    this.researchForm = new FormGroup({
        title: new FormControl(''),
        publisher: new FormControl(''),
        year: new FormControl(''),
        pages: new FormControl(''),
        edition: new FormControl(''),
        publishedDate: new FormControl(new Date()),
        paperSummary: new FormControl(''),
        sector: new FormControl('')
    });
  }

  setForm(data: ResearchDocumentModel) {
    this.researchForm.setValue({
      title: data.title,
      publisher: data.publisher,
      year: data.year,
      pages: data.pages,
      edition: data.edition,
      publishedDate: data.publishedDate,
      paperSummary: data.paperSummary,
      sector: data.sector
  });
  }

  save({ valid, value }: { valid: boolean; value: ResearchDocumentModel}) {
      if (this.uploadedFiles.length > 0) {
     this.researchService.createOrUpdateResearchDocument(value).subscribe(res => {
        const document = res as ResearchDocumentModel;
        const formData: FormData = new FormData();
        formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
        this.researchService.storeFile(formData, document.id).subscribe(fileRes => {
            console.log('Document Added to the system');
        });
     });
    }
  }

  clearForm() {
    this.researchForm.reset({});
  }

  returnToList() {
    this.router.navigate(['/layout/research']);
  }
  onUpload(event) {
    this.uploadedFiles.push(event.files[0]);
  }

  goToAuthor() {
    console.log(this.id);
    if (this.id !== '0') {
    this.router.navigate(['/layout/researchDocumentAuthor/' + this.id]);
    }
  }

}

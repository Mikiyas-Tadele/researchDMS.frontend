import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchDocumentAuthorModel } from '../models/research.document.author.model';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research-document-author',
  templateUrl: './research-document-author.component.html',
  styleUrls: ['./research-document-author.component.scss']
})
export class ResearchDocumentAuthorComponent implements OnInit {

  researchDocumentAuthors: any = [];
  researchDocumentAuthorCols: any = [];
  researchDocumentAuthorForm: FormGroup;
  documentId: any;

  constructor(private researchService: ResearchService,
         private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.researchDocumentAuthorCols = [
      {field: 'researchDocumentTitle', header: 'Title'},
      {field: 'fullName', header: 'Author'},
      {field:  'position', header: 'Position'},
      {field: 'id', header: 'id', hide: true}
    ];

     this.documentId = this.route.snapshot.params['documentId'];

    this.researchService.getResearchDocumentAuthors(this.documentId).subscribe(res => {
       this.researchDocumentAuthors = res as ResearchDocumentAuthorModel[];
    });
  }

  initForm() {
    this.researchDocumentAuthorForm = new FormGroup({
       fullName: new FormControl(''),
       position: new FormControl(' '),
       id: new FormControl('')
    });
  }

  setForm(data: ResearchDocumentAuthorModel) {
    this.researchDocumentAuthorForm.setValue({
       fullName: data.fullName,
       position: data.position,
       id: data.id
    });
  }

  save({ valid, value }: { valid: boolean; value: ResearchDocumentAuthorModel}) {
     value.researchDocumentId = this.documentId;
      this.researchService.createOrUpdateResearchDocumentAuthor(value).subscribe(res => {
        this.researchService.getResearchDocumentAuthors(this.documentId).subscribe(resDoc => {
          this.researchDocumentAuthors = resDoc as ResearchDocumentAuthorModel[];
       });
      });
  }
  clearForm() {
    this.researchDocumentAuthorForm.reset({});
  }

  returnToList() {
    this.router.navigate(['/layout/researchForm/' + this.documentId]);
  }

  update(data: ResearchDocumentAuthorModel) {
    this.setForm(data);
  }

}

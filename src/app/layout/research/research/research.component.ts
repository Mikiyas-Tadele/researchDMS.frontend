import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResearchDocumentModel } from '../models/research.document.model';
import { SearchModel } from '../models/search.model';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  researchDocuments: ResearchDocumentModel[];
  researchDocumentCols: any = [];
  searchForm: FormGroup;

  constructor(private researchService: ResearchService, private router: Router) { }

  ngOnInit() {

    this.researchDocumentCols = [
      {field: 'title', header: 'Title'},
      {field: 'sector', header: 'Sector'},
      {field: 'publisher', header: 'Publisher'},
      {field: 'year', header: 'Published Year'},
      {field: 'pages', header: 'Pages'},
      {field: 'edition', header: 'Edition'},
      {field: 'publishedDate', header: 'Published Date'},
      {field: 'paperSummary', header: 'Summary'},
      {field:  'id', header: 'id', hide: true}
     ];

    this.researchService.getResearchDocuments().subscribe(res => {
       this.researchDocuments = res as ResearchDocumentModel[];
    });

  }

  update(data: ResearchDocumentModel) {
    this.router.navigate(['/layout/researchForm/' + data.id]);
  }

  addNew() {
    this.router.navigate(['/layout/researchForm/0']);
  }

  downloadFile(data: ResearchDocumentModel) {
    this.researchService.downloadFile(data.id);
  }

}

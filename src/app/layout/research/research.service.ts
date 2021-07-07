import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { saveFile } from 'src/app/shared/services/file.saver.helper';
import { ResearchDocumentAuthorModel } from './models/research.document.author.model';
import { ResearchDocumentModel } from './models/research.document.model';
import { SearchModel } from './models/search.model';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

   createOrUpdateResearchDocument(data: ResearchDocumentModel) {
     return this.http.post(this.baseUrl + '/research/create_document', data);
   }

   getResearchDocuments() {
     return this.http.get(this.baseUrl + '/research/documents');
   }

   getResearchDocument(id: any) {
     return this.http.get(this.baseUrl + '/research/document/' + id);
   }

   createOrUpdateResearchDocumentAuthor(data: ResearchDocumentAuthorModel) {
     return this.http.post(this.baseUrl + '/research/create_document_author', data);
   }

   getResearchDocumentAuthors(documentId: any) {
      return this.http.get(this.baseUrl + '/research/document_authors/' + documentId);
   }

   storeFile(file: any, documentId: number) {
      return this.http.post(this.baseUrl + '/research/store?documentId=' + documentId, file);
   }
   downloadFile(documentId: number) {
    return this.http.get(this.baseUrl + '/research/downloadFile?documentId=' + documentId, {responseType: 'blob'})
      .subscribe((res: any) => {
        console.log(res);
        return saveFile(res, 'myname');
      });
  }

  getAllResearchDocuments() {
    return this.http.get(this.baseUrl + '/research/allResearchView');
  }

  findResearchDocuments(data: SearchModel) {
    return this.http.post(this.baseUrl + '/research/findResearchDocuments', data);
  }

}

import {Component}    from '@angular/core';
import { AppComponent } from "../../app.component";
import {Accreditation, Authorization, Message} from "../../types";
import {SharedService} from "../../services/shared.service";
import {ChainService} from "../../services/chain.service";

@Component({
  moduleId: module.id,
  selector: 'issued-authorizations',
  templateUrl: 'issued-authorizations.component.html'
})
export class IssuedAuthorizationsComponent extends AppComponent{
  private authorizations:Authorization[];
  private msg:Message;

  constructor(private sharedSrv:SharedService,private chainService:ChainService) {
    super(sharedSrv);
  };

  OnInitialized():void {
    // get issued authorizations
    this.chainService.get_issued_authorizations(this.enrolledId).then(result => {
      this.authorizations = result as Authorization[];

      if(this.authorizations){
        this.authorizations.forEach((auth,idx) => {
          this.chainService.get_accreditation(auth.AccreditationID).then(result => {
            this.authorizations[idx].Accreditation = result as Accreditation;
          });
        });
      }

      if(!this.authorizations || (this.authorizations && this.authorizations.length == 0)) {
        this.msg = {text:"No authorizations found", level:"alert-info"}
      }
    });
  }

  revoke_authorization(authorization:Authorization):void {
    let now = new Date();
    this.msg = {text:"Revoking signing authorization..",level:"alert-info"};
    this.chainService.revoke_signing_authority(authorization.AccreditationID,authorization.AuthorizedParty,now.toISOString()).then(result => {
      this.msg = {text:result,level:"alert-success"};
      this.OnInitialized();
    }).catch(reason => {
      this.msg = {text:reason.toString(),level:"alert-danger"};
    });
  }

}

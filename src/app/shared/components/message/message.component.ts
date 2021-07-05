import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageModel } from '../../../models/message.model';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.less']
})
export class MessageComponent implements OnInit {

    @Input() position: string = 'bottom-right';
    messages: MessageModel[] = [];
    msgSubscription: Subscription;

    constructor(private _ms: MessageService) {
        this.msgSubscription = this._ms.getMessages().subscribe((messages: any) => { this.messages = messages; });
    }

    ngOnDestroy() {
        this.msgSubscription.unsubscribe();
    }

    ngOnInit() {}

    public close(idx: number) {
        this._ms.clearSingleMessage(idx);
    }

}
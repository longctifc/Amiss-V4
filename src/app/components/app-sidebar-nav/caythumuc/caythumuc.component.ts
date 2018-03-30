import { Component, ViewChild, AfterViewInit, ViewEncapsulation, AfterContentInit, Output, EventEmitter } from '@angular/core';

import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { DanhMucService, UserService } from '../../../services/index';

@Component({
    selector: 'app-caythumuc',
    templateUrl: './caythumuc.component.html',
    styleUrls: ['./caythumuc.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class CaythumucComponent implements AfterViewInit, AfterContentInit {

    @ViewChild('dropDownTram') dropDownTram: jqxDropDownButtonComponent;
    @ViewChild('treeDienLucTram') treeDienLucTram: jqxTreeComponent;
    @ViewChild('cboCtydl') cboCtydl: jqxComboBoxComponent;

    public dltong: string;

    constructor(
        private DanhMucService: DanhMucService,
        private user: UserService,
    ) { }

    public ngAfterViewInit(): void {

        let dropDownTramSettings: jqwidgets.DropDownButtonOptions =
            {
                width: '100%',
                height: '25'
            }
        this.dropDownTram.setOptions(dropDownTramSettings);

        let treeSettings: jqwidgets.TreeOptions =
            {
                width: '100%',
                height: "370px"
            }
        this.treeDienLucTram.createComponent(treeSettings);

        let cboCtyDlSettings: jqwidgets.ComboBoxOptions =
            {
                width: '100%',
                popupZIndex: 999999,
                searchMode: 'containsignorecase',  
            };

        this.cboCtydl.createComponent(cboCtyDlSettings);

        this.getAllDienLuc();
    }

    public ngAfterContentInit(): void {
        let currentUser = this.user.getCurrentUser();
        this.dltong = currentUser.tendanhmuc;
    }

    private getData(): void {
        this.DanhMucService.getAllTram(1).subscribe(res => {
            let retData = JSON.parse(res);
        })
    }

    private treeOnSelect(event: any): void {
        let item = this.treeDienLucTram.getItem(event.args.element);
        console.log(item.value);

        sessionStorage.setItem('selectedDirectory', item.value);

        let dropDownContent = `<div style="position: relative; margin-left: 3px; margin-top: 4px;">${item.label}</div>`;
        this.dropDownTram.close();
        this.dropDownTram.setContent(dropDownContent);
    }

    public getAllDienLuc() {
        let currentUser = this.user.getCurrentUser();
        this.DanhMucService.getAllDienLuc(currentUser.danhmucid).subscribe(response => {
            let listDienLuc: any = JSON.parse(response);
            let Inputsource: any =
                {
                    datatype: 'json',
                    localdata: listDienLuc.data,
                    datafields: [
                        { name: 'items' },
                        { name: 'label' },
                        { name: 'value' }
                    ],
                };
            let dataAdapter: any = new jqx.dataAdapter(Inputsource)
            this.cboCtydl.clear();
            this.cboCtydl.source(dataAdapter);

            this.cboCtydl.selectedIndex(1);
        });
    }

    private cboCtydlSelect(event: any): void {
        let selectedDanhmucid = event.args.item.value;
        this.getAllTram(selectedDanhmucid);
    }

    private getAllTram(idanhmuccha) {
        this.DanhMucService.getAllTram(idanhmuccha).subscribe(response => {
            let listTram: any = JSON.parse(response);
            this.treeDienLucTram.clear();
            this.treeDienLucTram.source(listTram.data);
        });
    }
}


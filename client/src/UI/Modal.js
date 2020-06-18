export class Modal {
	constructor(contentID, fallbackText) {
        this,fallbackText=fallbackText;
        this.contentID=contentID;
		this.contentTemplateEl = document.getElementById(contentID);
		this.modalTemplateEl = document.getElementById('modal-template');
	}

	show() {
		if ('content' in document.createElement('template')) {
			const modalElements = document.importNode(this.modalTemplateEl.content,true);
			this.modalElement = modalElements.querySelector('.modal');
			this.backDropElement = modalElements.querySelector('.backdrop');
			const contentElement = document.importNode(
				this.contentTemplateEl.content,
				true,
			);
            this.modalElement.append(contentElement);
            document.body.insertAdjacentElement('afterbegin',this.modalElement);
            document.body.insertAdjacentElement('afterbegin',this.backDropElement);
		} else {
			alert(fallbackText);
		}
	}
	hide() {
        if(this.modalElement){
            this.modalElement.remove();
            this.backDropElement.remove();
            this.modalElement=null;
            this.backDropElement=null;
        }
    }
}

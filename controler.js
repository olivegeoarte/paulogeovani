function Controler(){
	this.indice = "#id";
		this.itens = "#name";
		this.quantidade = "#phone";

	// Gets e SEts//
	this.getIndice = function(){
		return $(this.indice).val();
		}
	this.setIndice = function(valor){
		$(this.indice).val(valor);
		}
		
	this.getItens = function(){
		return $(this.itens).val();
		}
	this.setItens = function(valor){
		$(this.itens).val(valor);
		}	
	this.getQuantidade = function(){
		return $(this.quantidade).val();
		}
	this.setQuantidade = function(valor){
		$(this.quantidade).val(valor);
		}

///////////////////////////////////////////

	this.inserir = function (){
		model.inserir(this.getIndice(), this.getItens(), this.getQuantidade());
		this.setIndice("");
		this.setItens("");
		this.setQuantidade("");
		model.selecionaTodos();
		}
	this.ler = function (){
		model.selecionaTodos();
		}
	this.remover = function (){
		model.remover(this.getIndice());
		model.selecionaTodos();
		}
		
	this.removerId = function (valor){
		model.remover(valor);
		model.selecionaTodos();
		}	
	this.limpar = function (){
		model.limpar();
		model.selecionaTodos();
		}

	this.alterar = function(){
		model.alterar(this.getIndice(),this.getItens(), this.getQuantidade());
		model.selecionaTodos();
		}
	}
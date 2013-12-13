//1. Inicialização
function Conexao(){
	onInit();
	function onInit(){
		try {
			if (!window.openDatabase) {
				updateStatus("Erro: Seu navegador não permite banco de dados.");
			}
			else {
				initDB();
				createTables(); 
				//queryAndUpdateOverview();
				return true;
			}
		} 
		catch (e) {
			if (e == 2) {
				updateStatus("Erro: Versão de banco de dados inválida.");
			}
			else {
				updateStatus("Erro: Erro desconhecido: " + e + ".");
			}
			return;
		}
	}
	
	function initDB(){
		var shortName = 'BDcompras';
		var version = '1.0';
		var displayName = 'DBcompras';
		var maxSize = 65536; // Em bytes
		localDB = window.openDatabase(shortName, version, displayName, maxSize);
	}
	
	function createTables(){
		
		var query = 'CREATE TABLE IF NOT EXISTS Compras( '+
						' id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
						' produto VARCHAR NOT NULL, '+
						' quantidade VARCHAR NOT NULL '+
						
						
					'); ';
	
	
	
		try {
			localDB.transaction(function(transaction){
				transaction.executeSql(query, [], nullDataHandler, errorHandler);
				updateStatus("Tabela 'compras' status: OK.");
			});
		} 
		catch (e) {
			updateStatus("Erro: Data base 'Compras' não criada " + e + ".");
			return;
		}
		return true;
	}
}






//Manipulação Do banco apos criado
	function DAOCompras() {
	
	
	//2. Query e visualização de Update
	
	
	this.alterar = function ( id, produto, quantidade){
		
		if (id == "" || produto == "" || quantidade == "") {
			updateStatus("Todos os Campos são obrigatórios!");
		}
		else {
			var query = "UPDATE Compras set produto = ?, quantidade= ? where id= ?";
			try {
				localDB.transaction(function(transaction){
					transaction.executeSql(query, [produto, quantidade, id], function(transaction, results){
						if (!results.rowsAffected) {
							updateStatus("Erro: Update não realizado.");
						}
						else {							
							updateStatus("Alteração realizada com Sucesso. ");							
						}
					}, errorHandler);
				});
			} 
			catch (e) {
				updateStatus("Erro: UPDATE não realizado " + e + ".");
			}
		}
	}
	
	this.remover = function(id){
		
		
		var query = "DELETE FROM Compras WHERE id= ?;";
		try {
			localDB.transaction(function(transaction){
			
				transaction.executeSql(query, [id], function(transaction, results){
					if (!results.rowsAffected) {
						updateStatus("Erro: Delete não realizado.");
					}
					else {
						updateStatus("Exclusão realizada com sucesso.");
					}
				}, errorHandler);
			});
		} 
		catch (e) {
			updateStatus("Erro: DELETE não realizado " + e + ".");
		}
		
	}
	this.limpar = function(){
		
		
		var query = "DELETE FROM Compras;";
		try {
			localDB.transaction(function(transaction){
			
				transaction.executeSql(query, function(transaction, results){
					if (!results.rowsAffected) {
						updateStatus("Erro: Delete não realizado.");
					}
					else {
						updateStatus("Exclusão realizada com sucesso.");
					}
				}, errorHandler);
			});
		} 
		catch (e) {
			updateStatus("Erro: DELETE não realizado " + e + ".");
		}
		
	}
	
	this.inserir = function (id, produto, quantidade){
		
				if (id == "" || produto == "" || quantidade == "") {
			updateStatus("Os campos obrigatórios!");
		}
		else {
			var query = "INSERT INTO Compras (id, produto, quantidade) VALUES (?, ?, ?);";
			try {
				localDB.transaction(function(transaction){
					transaction.executeSql(query, [id, produto, quantidade], function(transaction, results){
						if (!results.rowsAffected) {
							updateStatus("Erro: Inserção não realizada");
						}
						else {
							updateStatus("Inserção realizada com Sucesso.");
							
							
						}
					}, errorHandler);
				});
			} 
			catch (e) {
				updateStatus("Erro: INSERT não realizado " + e + ".");
			}
		}
	}
	
	
	
	/* Seleciona todos os registros do Banco de Dados*/
	this.selecionaTodos = function(){
		//Realiza a leitura no banco
		var query = "SELECT * FROM Compras ORDER BY id";
		try {
			localDB.transaction(function(transaction){			
				transaction.executeSql(query, [], function(transaction, results){
					objLista = "";
					for (var i = 0; i < results.rows.length; i++) {
						var row = results.rows.item(i);
						objLista += "<tr><td>" + row['produto']  + "</td> <td>" +row['quantidade']+ "</td><td>" + "<button onClick='controler.removerId("+ row['id']+")'>Remover item</button>" +"</tr>";
																
					}
					
					
             
         //    objLista += "</tbody>";
             
             $("#divLista").html(objLista);
				}, function(transaction, error){
					updateStatus("Erro: " + error.code + "\n Mensagem: " + error.message);
				});
			});
		} 
		catch (e) {
			updateStatus("Error: SELECT não realizado " + e + ".");
		}
		}
	
}
function updateStatus(status){
		alert(status);
	}
// Tratando erros
	
	errorHandler = function(transaction, error){
		updateStatus("Erro: " + error.message);
		return true;
	}
	
	nullDataHandler = function(transaction, results){
	}
/// <reference path="typings/knockout/knockout.d.ts"/>
function OracleInstanceModel() {
	
	var self = this;
	
	//basic instance data
	this.ORACLE_SID=ko.observable("SID");
	this.ORACLE_BASE=ko.observable("/u01/app/oracle");
	this.ORACLE_HOME=ko.observable("/u01/app/oracle/product/11.2");
	this.ORACLE_SYS_PWD = ko.observable("Password01");
	
	
	
	//multiplexin'
	this.REDO_MULTIPLEX = ko.observable(2);
	this.REDO_GROUP = ko.observable(3);
	this.REDO_SIZE = ko.observable("50M");
	this.CTL_MULTIPLEX = ko.observable(3);
	
	
	this.ORACLE_ENV_PATH = ko.computed (function() {
		return this.ORACLE_HOME()+"/bin";
	},this);
	
	this.ORACLE_DBS = ko.computed (function() {
		return this.ORACLE_HOME()+"/dbs";
	},this);
	//basic install dir
	this.ROOT_DIR = ko.computed(function() {
		return this.ORACLE_BASE()+ "/oradata";
	}, this)  ;
	
	//from install dir and stuff we get the following:
	this.ROOT_DATAFILES = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/datafiles";
	},this);
	
	this.ROOT_CTL = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/ctl";
	},this);
	
	this.ROOT_DIAG = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/diag";
	},this);

	this.ROOT_ARC = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/arc";
	},this);


	this.ROOT_FLASH = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/flash";
	},this);
	
	this.ROOT_REDO = ko.computed (function() {
		return this.ROOT_DIR()+"/"+this.ORACLE_SID()+"/redo";
	},this);
	
	
	this.ROOT_CTL_PATH = function () {
		var paths = ko.observableArray();
		for (var h = 1; h <= self.CTL_MULTIPLEX(); h++)
			paths.push ({ctl_path :   self.ROOT_CTL()+"/"+new String(h) } );
		return paths;
	};

	this.ROOT_REDO_PATH = ko.computed ( function () {
		var paths = ko.observableArray();
		for (var h = 1; h <= self.REDO_MULTIPLEX(); h++)
			paths.push ({redo_path :   self.ROOT_REDO()+"/"+new String(h) } );
		return paths;
	});
	
	this.createGroup = function (nGroup) {
		var s = "\n        GROUP " + new String(nGroup)+" (";
		var ctl = self.REDO_MULTIPLEX();
		var sTemp = "";
		for (var h = 1; h <= ctl; h++) {
			sTemp += "\n            '" + self.ROOT_REDO()+"/" + new String(h) + "/redo_" + new String(nGroup) + "_" + new String(h)+".ora'";
			if ( h != ctl)
				sTemp += ',';
		}
		s += sTemp + "\n        ) SIZE "  + self.REDO_SIZE();
		return s;
	}
	
	this.createLog = ko.computed( function () {
		var s = "";
		var ctl = self.REDO_GROUP();
		for (var h = 1; h <= ctl; h++) {
			s += self.createGroup(h);
			if ( h != ctl)
				s += ',';
		}
		return s;
	},this);
	
	this.initOra = ko.computed ( function() {
		var s
		= "# init.ora file automatically generated ----------------\n" 
		+ "DB_NAME=" + this.ORACLE_SID() + "\n"
		+ "DB_UNIQUE_NAME=" + this.ORACLE_SID() + "\n"
		+ "DB_DOMAIN=instance.creation.web\n"
		+ "MEMORY_TARGET=600M\n"
		+ "PROCESSES=150\n"
		+ "DB_BLOCK_SIZE=8192\n"
		+ "# LOG_ARCHIVE_DEST_1=" + this.ROOT_ARC() + "\n"
		+ "DB_RECOVERY_FILE_DEST=" + this.ROOT_FLASH() + "\n"
		+ "DB_RECOVERY_FILE_DEST_SIZE=8G\n"
		+ "DIAGNOSTIC_DEST=" + this.ROOT_DIAG() + "\n";
		
		var ctl = self.CTL_MULTIPLEX();
		var sTemp = "";
		for (var h = 1; h <= ctl; h++) {
			sTemp += "'" + self.ROOT_CTL()+"/" + new String(h) + "/controlfile.ora'";
			if ( h != ctl)
				sTemp += ',';
		}
		s+= "CONTROL_FILES="+sTemp + "\n";
		s+= "# end of init.ora --------------------------------------\n";
		return s;
	},this);
	
	this.dumpToConsole = function() {
		console.log (self.ORACLE_SID());
		console.log (self.ORACLE_BASE());
		console.log (self.ORACLE_HOME());
		console.log (self.ORACLE_SYS_PWD());
		
		console.log (self.REDO_MULTIPLEX());
		console.log (self.CTL_MULTIPLEX());

		console.log (self.ORACLE_ENV_PATH());
		console.log (self.ORACLE_DBS());

		console.log (self.ROOT_DIR());
		console.log (self.ROOT_CTL());
		console.log (self.ROOT_DIAG());
		console.log (self.ROOT_DATAFILES());
		console.log (self.ROOT_REDO());
		console.log (self.ROOT_FLASH());
		console.log (self.ROOT_ARC());
		
		console.log (self.initOra());
	};
	
}

/*
 * Encoding and decoding diameter messages
 */

/*

  Diameter header
  ===============

  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  |    Version    |                 Message Length                |
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  | Command Flags |                  Command Code                 |
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  |                         Application-ID                        |
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  |                      Hop-by-Hop Identifier                    |
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  |                      End-to-End Identifier                    |
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  |  AVPs ...
  +-+-+-+-+-+-+-+-+-+-+-+-+-

*/

var COMMAND_CODE = {

	ASR: { code: 274, name: 'Abort-Session-Request'	},
	ASA: { code: 274, name: 'Abort-Session-Answer' },
	ACR: { code: 271, name: 'Accounting-Request' },
	ACA: { code: 271, name: 'Accounting-Answer'	},
	CER: { code: 257, name: 'Capabilities-Exchange-Request'	},
	CEA: { code: 257, name: 'Capabilities-Exchange-Answer' },
	DWR: { code: 280, name: 'Device-Watchdog-Request' },
	DWA: { code: 280, name: 'Device-Watchdog-Answer' },
	DPR: { code: 282, name: 'Disconnect-Peer-Request' },
	DPA: { code: 282, name: 'Disconnect-Peer-Answer' },
	RAR: { code: 258, name: 'Re-Auth-Request' },
	RAA: { code: 258, name: 'Re-Auth-Answer' },
	STR: { code: 275, name: 'Session-Termination-Request' },
	STA: { code: 275, name: 'Session-Termination-Answer' }

};

Object.freeze(COMMAND_CODE)


var DiameterMessage = function(commandCode, commandFlags) {


	// "This Version field MUST be set to 1 to indicate Diameter Version 1"

	this.version = 1;

	this.commandCode = commandCode;

	this.commandFlags = commandFlags;

	/*

		Application-ID
		==============

		Diameter common message       0
		Diameter base accounting      3
		Relay                         0xffffffff

		*/

	this.applicationId = 0;

	this.hopByHopId = undefined;

	this.endToEndId = undefined;

	this.avps = [];
}

DiameterMessage.prototype.addAVP = function(avp) {
	this.avps.push(avp);
}

var encodeDiameterMessage = function(diameterMessage) {

}

var decodeDiameterMessage = function(data) {

}


/*

	AVP Header
	==========

	0                   1                   2                   3
	0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	|                           AVP Code                            |
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	|V M P r r r r r|                  AVP Length                   |
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	|                        Vendor-ID (opt)                        |
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	|    Data ...
	+-+-+-+-+-+-+-+-+

*/

var AVP = function(avpCode, avpFlags, vendorId) {

	this.avpCode = avpCode;

	this.avpFlags = avpFlags;

	this.vendorId = vendorId;

	this.data = undefined;
}

AVP.prototype.setData = function(data) {
	this.data = data;
}




// see 4.2.  Basic AVP Data Formats
var encodeAVP = function(avp) {



}

var decodeAVP = function(data) {

}



// Diameter Base AVPs

var baseAVPs = {
  85: 	{ name:"Acct-Interim-Interval", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  483: 	{ name:"Accounting-Realtime-Required", type: "Enumerated", flags: {M:1, V:0, P:0} },
  50: 	{ name:"Acct-Multi-Session-Id", type: "UTF8String", flags: {M:1, V:0, P:0} },
  485: 	{ name:"Accounting-Record-Number", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  480: 	{ name:"Accounting-Record-Type", type: "Enumerated", flags: {M:1, V:0, P:0} },
  44: 	{ name:"Acct-Session-Id", type: "OctetString", flags: {M:1, V:0, P:0} },
  287: 	{ name:"Accounting-Sub-Session-Id", type: "Unsigned64", flags: {M:1, V:0, P:0} },
  259: 	{ name:"Acct-Application-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  258: 	{ name:"Auth-Application-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  274: 	{ name:"Auth-Request-Type", type: "Enumerated", flags: {M:1, V:0, P:0} },
  291: 	{ name:"Authorization-Lifetime", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  276: 	{ name:"Auth-Grace-Period", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  277: 	{ name:"Auth-Session-State", type: "Enumerated", flags: {M:1, V:0, P:0} },
  285: 	{ name:"Re-Auth-Request-Type", type: "Enumerated", flags: {M:1, V:0, P:0} },
  25: 	{ name:"Class", type: "OctetString", flags: {M:1, V:0, P:0} },
  293: 	{ name:"Destination-Host", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  283: 	{ name:"Destination-Realm", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  273: 	{ name:"Disconnect-Cau", type: "Enumerated", flags: {M:1, V:0, P:0} },
  281: 	{ name:"Error-Message", type: "UTF8String", flags: {M:0,V:0,P:0 }},
  294: 	{ name:"Error-Reporting-Host", type: "DiamIdent", flags: {M:0,V:0,P:0} },
  55: 	{ name:"Event-Timestamp", type: "Time", flags: {M:1, V:0, P:0} },
  297: 	{ name:"Experimental-Result", type: "Grouped", flags: {M:1, V:0, P:0} },
  298: 	{ name:"Experimental-Result-Code", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  279: 	{ name:"Failed-AVP", type: "Grouped", flags: {M:1, V:0, P:0} },
  267: 	{ name:"Firmware-Revision", type: "Unsigned32", flags: {M:0,V:0,P:0} },
  257: 	{ name:"Host-IP-Addres", type: "Address", flags: {M:1, V:0, P:0} },
  299: 	{ name:"Inband-Security-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} }
  272: 	{ name:"Multi-Round-Time-Out", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  264: 	{ name:"Origin-Host", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  296: 	{ name:"Origin-Realm", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  278: 	{ name:"Origin-State-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  269: 	{ name:"Product-Name", type: "UTF8String", flags: {M:0,V:0,P:0 }},
  280: 	{ name:"Proxy-Host", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  284: 	{ name:"Proxy-Info", type: "Grouped", flags: {M:1, V:0, P:0} },
  33: 	{ name:"Proxy-State", type: "OctetString", flags: {M:1, V:0, P:0} },
  292: 	{ name:"Redirect-Host", type: "DiamURI", flags: {M:1, V:0, P:0} },
  261: 	{ name:"Redirect-Host-Usage", type: "Enumerated", flags: {M:1, V:0, P:0} },
  262: 	{ name:"Redirect-Max-Cache-Time", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  268: 	{ name:"Result-Code", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  282: 	{ name:"Route-Record", type: "DiamIdent", flags: {M:1, V:0, P:0} },
  263: 	{ name:"Session-Id", type: "UTF8String", flags: {M:1, V:0, P:0} },
  27: 	{ name:"Session-Timeout", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  270: 	{ name:"Session-Binding", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  271: 	{ name:"Session-Server-Failover", type: "Enumerated", flags: {M:1, V:0, P:0} },
  265: 	{ name:"Supported-Vendor-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  295: 	{ name:"Termination-Cause", type: "Enumerated", flags: {M:1, V:0, P:0} },
  1: 		{ name:"User-Name", type: "UTF8String", flags: {M:1, V:0, P:0} },
  266: 	{ name:"Vendor-Id", type: "Unsigned32", flags: {M:1, V:0, P:0} },
  260: 	{ name:"Vendor-Specific-Application-Id", type: "Grouped", flags: {M:1, V:0, P:0} }
};

var avpAcctInterimInterval = function() { return new AVP(85,baseAVPS[85].flags)};
var avpAccountingRealtimeRequired = function() { return new AVP(483,baseAVPS[483].flags)};
var avpAcctMultiSessionId = function() { return new AVP(50,baseAVPS[50].flags)};
var avpAccountingRecordNumber = function() { return new AVP(485,baseAVPS[485].flags)};
var avpAccountingRecordType = function() { return new AVP(480,baseAVPS[480].flags)};
var avpAcctSessionId = function() { return new AVP(44,baseAVPS[44].flags)};
var avpAccountingSubSessionId = function() { return new AVP(287,baseAVPS[287].flags)};
var avpAcctApplicationId = function() { return new AVP(259,baseAVPS[259].flags)};
var avpAuthApplicationId = function() { return new AVP(258,baseAVPS[258].flags)};
var avpAuthRequestType = function() { return new AVP(274,baseAVPS[274].flags)};
var avpAuthorizationLifetime = function() { return new AVP(291,baseAVPS[291].flags)};
var avpAuthGracePeriod = function() { return new AVP(276,baseAVPS[276].flags)};
var avpAuthSessionState = function() { return new AVP(277,baseAVPS[277].flags)};
var avpReAuthRequestType = function() { return new AVP(285,baseAVPS[285].flags)};
var avpClass = function() { return new AVP(25,baseAVPS[25].flags)};
var avpDestinationHost = function() { return new AVP(293,baseAVPS[293].flags)};
var avpDestinationRealm = function() { return new AVP(283,baseAVPS[283].flags)};
var avpDisconnectCause = function() { return new AVP(273,baseAVPS[273].flags)};
var avpErrorMessage = function() { return new AVP(281,baseAVPS[281].flags)};
var avpErrorReportingHost = function() { return new AVP(294,baseAVPS[294].flags)};
var avpEventTimestamp = function() { return new AVP(55,baseAVPS[55].flags)};
var avpExperimentalResult = function() { return new AVP(297,baseAVPS[297].flags)};
var avpExperimentalResultCode = function() { return new AVP(298,baseAVPS[298].flags)};
var avpFailedAVP = function() { return new AVP(279,baseAVPS[279].flags)};
var avpFirmwareRevision = function() { return new AVP(267,baseAVPS[267].flags)};
var avpHostIPAddres = function() { return new AVP(257,baseAVPS[257].flags)};
var avpInbandSecurityId = function() { return new AVP(299,baseAVPS[299].flags)};
var avpMultiRoundTimeOut = function() { return new AVP(272,baseAVPS[272].flags)};
var avpOriginHost = function() { return new AVP(264,baseAVPS[264].flags)};
var avpOriginRealm = function() { return new AVP(296,baseAVPS[296].flags)};
var avpOriginStateId = function() { return new AVP(278,baseAVPS[278].flags)};
var avpProductName = function() { return new AVP(269,baseAVPS[269].flags)};
var avpProxyHost = function() { return new AVP(280,baseAVPS[280].flags)};
var avpProxyInfo = function() { return new AVP(284,baseAVPS[284].flags)};
var avpProxyState = function() { return new AVP(33,baseAVPS[33].flags)};
var avpRedirectHost = function() { return new AVP(292,baseAVPS[292].flags)};
var avpRedirectHostUsage = function() { return new AVP(261,baseAVPS[261].flags)};
var avpRedirectMaxCacheTime = function() { return new AVP(262,baseAVPS[262].flags)};
var avpResultCode = function() { return new AVP(268,baseAVPS[268].flags)};
var avpRouteRecord = function() { return new AVP(282,baseAVPS[282].flags)};
var avpSessionId = function() { return new AVP(263,baseAVPS[263].flags)};
var avpSessionTimeout = function() { return new AVP(27,baseAVPS[27].flags)};
var avpSessionBinding = function() { return new AVP(270,baseAVPS[270].flags)};
var avpSessionServerFailover = function() { return new AVP(271,baseAVPS[271].flags)};
var avpSupportedVendorId = function() { return new AVP(265,baseAVPS[265].flags)};
var avpTerminationCause = function() { return new AVP(295,baseAVPS[295].flags)};
var avpUserName = function() { return new AVP(1,baseAVPS[1].flags)};
var avpVendorId = function() { return new AVP(266,baseAVPS[266].flags)};
var avpVendorSpecificApplicationId = function() { return new AVP(260,baseAVPS[260].flags)};
/*

*/

import React, { useState, useEffect } from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "../Power-bi/Power-bi.css";
import axios, { post } from 'axios';

export default function Home() {
    
    //Información de tokens
    var client_id = "276c39b6-6aa4-4133-b54b-fd4540bbc254";
    var tenant_id = "d93defa3-574e-42fb-a1c0-e04a96ddd0c1";
    var secret_id = "ZJM8Q~UabYM8zDU4en2t.ufVRiFYpFG2x1oW1bBg";
    var groupid = "3fab3336-0f6c-4806-b04f-5f4e82da6170";
    var reportid = "9dffeed6-b959-47cb-8dbe-a7af8686cec1";
	
	//Información de apis
	const baseURL = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`;
	
	// Variables de petición
	const [tokenAZ, setTokenAZ] = useState("");
	const [tokeReport,setTokenReport] = useState("");
	const [embedurlpower,setembedurl] = useState("");
	
	var FormData = require('form-data');
	var data = new FormData();
	data.append('client_id', `${client_id}`);  
	data.append('client_secret', `${secret_id}`); 
	data.append('grant_type', 'client_credentials');
	data.append('scope', 'https://analysis.windows.net/powerbi/api/.default');

	var config = {
		method: 'GET',
		url: baseURL,
		data : data
	  };

	let accessToken = "";

	const [responseConfig, setResponseConfig] = useState({});

	React.useEffect(() => {

		axios("https://apiazurecrepes.azurewebsites.net/api/HttpTrigger1?code=lwC0HCS4i9VAHYfKoWbgkyq39lhtOc50nLWRgswYF8nNAzFuGiMV5Q==", {
		method: "GET",
		})
		.then(function (response) {
			setResponseConfig(response.data);
			setTokenAZ(response.data.AccessToken);
			setTokenReport(response.data.EmbedToken);
			setembedurl(response.data.EmbedUrl);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}, []);
		


	const filterVentas = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "venta_2018_2022",
			column: "nombre_limpio"
		},
		operator: "In",
		values: ["Aguas"]
	};
	const filterProductos = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "venta_productos_detalle",
			column: "nombre_limpio"
		},
		operator: "In",
		values: ["Aguas"]
	};
	const filterMeseras = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "plataforma_hora_clientes_mesera",
			column: "nombre_limpio"
		},
		operator: "In",
		values: ["Aguas"]
	};
	const filterPropinas = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "propina",
			column: "nombre_limpio"
		},
		operator: "In",
		values: ["Aguas"]
	};

    return (
        <div class ='container-powerbi'>
        <Header/>
            <div class ='container-reporte'>
                
			<PowerBIEmbed
				embedConfig={{
					type: 'report',   // Supported types: report, dashboard, tile, visual and qna
					id: reportid,
					embedUrl: embedurlpower,
					accessToken: tokeReport,
					tokenType: models.TokenType.Embed,
					filters: [filterVentas, filterProductos, filterMeseras, filterPropinas],
					settings: {
						panes: {
							filters: {
								visible: true
							}
						},
						background: models.BackgroundType.Transparent,
					}
				}}


				eventHandlers={
					new Map([
						['loaded', function () {
							console.log('Report loaded');
						}],
						['rendered', function () {
							console.log('Report rendered');
						}],
						['error', function (event) {
							console.log(event.detail);
						}]
					])
				}

				cssClassName={
					"Embed-container"
				}

				getEmbeddedComponent={
					(embeddedReport) => {
						window.report = embeddedReport;
					}
				}
			/>
            </div>
            <Footer />
        </div>

    )
    }


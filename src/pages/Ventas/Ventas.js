import React, { useState, useEffect } from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "../Power-bi/Power-bi.css";
import axios, { post } from 'axios';


export default function Home() {
    
    return (
        <div class ='container-powerbi'>
        <Header/>
            <div class ='container-reporte'>
				<iframe title="DATA" width="1330" height="820" src="https://app.powerbi.com/view?r=eyJrIjoiYjMyMmVkMzYtZGYyYy00YWUzLWIwNzItNGI5MjNiMjY0OTIxIiwidCI6ImQ5M2RlZmEzLTU3NGUtNDJmYi1hMWMwLWUwNGE5NmRkZDBjMSJ9&pageName=ReportSection404b5061bdbd222b7bae" frameborder="0" allowFullScreen="true"></iframe>
            </div>
            <Footer />
        </div>

    )
    }


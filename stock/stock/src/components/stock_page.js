/*eslint-disable*/
import React,{useState,useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart,Area,Bar
  } from 'recharts';
import {Form,FormControl,Button} from 'react-bootstrap';
//
function Stock_page(props){
  let [chartdata,chartdataset]=useState([]);
  let [draw,drawset] = useState(false);
  let URL = "https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피="+props.search+",";
 

   useEffect(()=>{
    axios.post('/stock', encodeURIComponent(props.search))
    .then((res)=>{
        chartdataset([...res.data])
        drawset(true);
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
        drawset(false); 
    })
  },[props.searchbutton])
    
    return (  
        <div>
            <iframe src={URL} width="1500" height="955"></iframe>
            
         {
            draw ===true
            ?
            <LineChart
            width={1500}
            height={700}
            data={chartdata}
            margin={{
              top: 50, right: 30, left: 20, bottom: 5,
            }
          }
          >
            <CartesianGrid strokeDasharray="20 20" />
            <XAxis dataKey="날짜" />
            <YAxis yAxisId="left" />  
            <YAxis yAxisId="right" orientation="right" /> 
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="linear" dataKey="등락률절댓값" stroke="#FF0000" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="기사량" stroke="#00D8FF" />
        </LineChart>
        
        :<h3>종목을 잘못 입력하셨습니다. 철자 확인해주세요~ </h3>
          }
         {draw===true?<Button onClick = {()=>{}} variant="warning" style = {{color : "white"}}>관심종목에 넣기</Button>: null}
         
        </div>
    );  
}

export default Stock_page;  

import axios from 'axios';
require('dotenv').config()



const getPositionInfo = async (symbol: string) => {
  let options: any = {
    method: 'GET',
    url: `https://yfapi.net/v6/finance/quote?symbols=${symbol}`,
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': `${process.env.YAHOO_API_KEY}`
    }
  };
 
    const positionInfo: any = []
     await axios.request(options).then( function (response: any) {
      
      let askPrice: number = response.data.quoteResponse.result[0].ask
      let companyName: string = response.data.quoteResponse.result[0].longName
      positionInfo.push(askPrice)
      positionInfo.push(companyName)
      // console.log(positionInfo)
     return positionInfo
     
    }).catch(function (error: any) {
      console.error(error);
    });

    return positionInfo

}
 


// console.log(position)

export default getPositionInfo;


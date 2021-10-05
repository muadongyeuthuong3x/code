
import  { CREATEINTRODUCE , UPDATEINTRODUCE , EDITINTRODUCE ,DELETEINTRODUCE  ,LISTINTRODUCE , SUCCESS ,ERROR , CLEAR}   from '../Contants/type'

export const IntroduceReducer = (state , action)=>{
  const {type  , payload  } = action
  
 switch (type) {

    case CREATEINTRODUCE:
          
        return {
            ...state,
            data:payload
        }
   
        case LISTINTRODUCE:
             
           return {
               ...state,
               listdata:payload
           }
       
           case DELETEINTRODUCE:
             
               state.listdata.forEach((data,index) => {
                   if(data._id === payload){
                       state.listdata.splice(index,1)
                      
                   }
               });
          
               return {
                   ...state
               }
   
               case EDITINTRODUCE:
                   return {
                       ...state,
                       dataedit:payload
                   }
              
                  case UPDATEINTRODUCE:{
                      return {
                       ...state,
                       data:payload
                      }
                  }
   
       case SUCCESS:
             
           return {
               ...state,
               success:payload,
               error:null
           }
       case ERROR:
             
               return {
                   ...state,
                   error:payload,
                   success:null
               }
       case CLEAR:{
           return {
               ...state,
               error:payload,
               success:payload
           }
       }
   
   
        default:
           return state
    }
}
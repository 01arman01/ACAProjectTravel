import {createUseStyles}from 'react-jss'

export const useStyles = createUseStyles({
     btnContainer:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:"center",
         flexWrap:'wrap'
     },
    btn:{
         margin:'10px',
    }
})
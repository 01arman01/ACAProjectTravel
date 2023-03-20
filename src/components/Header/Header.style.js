import  react from 'react'
import {createUseStyles} from "react-jss";


const usStyle = createUseStyles({
    container:{
        position:"relative",
        // marginBottom:'30px'
    },
    classHeader:{
        position:"relative",
        width:'100vw',
        padding:'0 2rem',
        background:'rgba(223,216,216,0.8)',
        backdropFilter:'blur(15px)',
        // marginBottom:'100px',
    },
    navbar:{
       width:"100%",
        height:"60px",
        maxWidth:'1200px',
        margin:"0 auto",
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
    aLink:{
        textDecoration: 'none',
        fontSize: '1rem',
        color: 'black',
        "&:hover":{
            color:"rgb(8,180,206)",
        },

    },
    navbarLogoLink:{
        fontSize:'1.5rem',
        fontWeight:'bold',
    },
    navbarLinks:{
        display:'flex',
        gap:'2rem',
        '@media (max-width: 620px)': {
            display:'none'
        }


    }
    ,navbarLink:{

    },
    ToggleBtn:{
        fontSize:'1.5rem',
        cursor:'pointer',
        display:'none',
        '@media (max-width: 620px)': {
            display:'block'
        }
    },
    actionBtn:{
        padding:'0.5rem 1rem',
        background:"rgb(8,180,206)",
        color:'white',
        border:'none',
        outline:'none',
        borderRadius:'20px',
        fontSize:'0.8rem',
        fontWeight:'bold',
        cursor:'pointer',
        transition:'scale 0.2 ease',
        '&:hover':{
            color:"white",
            backgroundColor:'#1e5aaf',
            // scale:'1.05'
        },
        '@media (max-width: 620px)': {
            display:'none'
        }
    },
    actionBtnLogout:{
        padding:'0.5rem 1rem',
        background:"rgb(218,6,6)",
        color:'white',
        border:'none',
        outline:'none',
        borderRadius:'20px',
        fontSize:'0.8rem',
        fontWeight:'bold',
        cursor:'pointer',
        transition:'scale 0.2 ease',
        '&:hover':{
            color:"white",
            backgroundColor:'#5f0606',
            // scale:'1.05'
        },
        '@media (max-width: 620px)': {
            display:'none'
        }
    },
    dropdownMenu:{
        zIndex:4,
        position:'absolute',
        right:'2rem',
        top:'60px',
        width:'300px',
        display:'block',
        height:'240px',
        background:'rgba(255,255,255,0.1)',
        backdropFilter:'blur(15px)',
        borderRadius: '10px',
        overflow:"hidden",
        padding:'1px',
        '@media (min-width: 620px)': {
            display:'none'
        }
        // display:'none'
    },
    dropdownMenuOpen:{
        position:'absolute',
        right:'2rem',
        top:'60px',
        width:'300px',
        height:'240px',
        background:'rgba(255,255,255,0.1)',
        backdropFilter:'blur(15px)',
        borderRadius: '10px',
        overflow:"hidden",
        padding:'1px',
    },

    dropdownMenuLi:{
        padding:'0.7rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    dropdownMenuActionBtn:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
    },
    actionBtnLogoutClose:{
        padding:'0.5rem 1rem',
        background:"rgb(218,6,6)",
        color:'white',
        border:'none',
        outline:'none',
        borderRadius:'20px',
        fontSize:'0.8rem',
        fontWeight:'bold',
        cursor:'pointer',
        transition:'scale 0.2 ease',
        '&:hover':{
            color:"white",
            backgroundColor:'#5f0606',
            // scale:'1.05'
        },
    }
})

export default  usStyle
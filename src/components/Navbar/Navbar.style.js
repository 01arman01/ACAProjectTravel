import React from 'react'
import {render} from 'react-dom'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    listUl: {
        listStyle: 'none',
        // border: '0.5px solid ' +
        //     'rgba(193,183,183,0.72)',
        width: '20vw',
        background: '#e5e0e0',
        backdropFilter: 'blur(15px)',
        // borderRadius: '5px',

    },
    listLi: {
        fontWeight: 'bold',
        border: '0.5px solid ' +
            'rgba(193,183,183,0.72)',
    },
    liHeader: {
        paddingLeft: '10px',
        cursor: "pointer",
        width: '100%',
        color: 'black',
        // border: '0.5px solid rgb(8,180,206)',
        "&:hover": {
            color: "rgb(8,180,206)",
        },
    },
    DropdownClass: {
        backgroundColor: '#ffffff',
        borderRight: '1px solid rgba(193,183,183,0.91)',
    },
//     change Password Component
    passChangeContainer: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'space-around',
        justifyContent: "right",
        paddingRight: '10%',
        paddingBottom: '10px',

    },

    passChangeButtonStyle: {
        width: '100%',
        textAlign: 'right',

    },
//    User info styles
    avatarContainer:{
        margin:'10px auto',padding:"0 0 0 10px",
        textAlign:'center'
    },
    avatarName:{
        marginRight:'10px',
        // textAlign:"center"
    }


})

export default useStyles;
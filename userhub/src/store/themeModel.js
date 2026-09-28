import {action} from 'easy-peasy';

export const theme={
    mode:'light',
    toggle:action((state)=>{
        state.mode=state.mode==='light'?'dark':'light';
        
    })
}
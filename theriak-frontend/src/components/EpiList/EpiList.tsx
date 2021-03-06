import React from 'react';

import { Epi } from '../../dataTypes';
import EpiItem from '../EpiItem/EpiItem';
import Spinner from '../Spinner/Spinner';
import './EpiList.css';

type EpiListProps = {
    epiList: Array<Epi>,
    isLoadingData: boolean,
    investigateEpi: (id:number) => void,
    reportScore: (id:number) => void 
}

const EpiList: React.FC<EpiListProps> = ({ epiList, isLoadingData, investigateEpi, reportScore }) => {

    const renderContent = () => {
        return (
            <>
                <div className='textHeader'>Everyday peace indicators</div>
                <div className='textSubHeader'>Peacekeeper</div>
                {epiList.map(epi => <EpiItem key={epi.id} epi={epi} investigateEpi={investigateEpi} reportScore={reportScore} />)}
            </>
        );
    }
    return (
        <div className='epiList'>
            {isLoadingData ? <Spinner /> : renderContent()}
        </div>
    );
}

export default EpiList;


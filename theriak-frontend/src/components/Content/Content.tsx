import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faPlusCircle,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Content.css";
import EpiList from "../EpiList/EpiList";
import TrustPeople from "../TrustPeople/TrustPeople";
import {
    chainEpiList,
    raiseInvestigation,
    getAggregate,
} from "../../common/apiFunctions";
import AddEpiModal from "../AddEpi/AddEpiModal";
import AddTrustModal from "../AddTrust/AddTrustModal";
import constructGraph from "./Graph";
import { mockEpiList } from "../../common/mockData";

const Content: React.FC = () => {
    const [isTrustPeopleVisibile, setIsTrustPeopleVisible] = useState(false);
    const [isAddEpiVisible, setisAddEpiVisible] = useState(false);
    const [isAddTrustVisible, setisAddTrustVisible] = useState(false);
    const [epi, setEpi] = useState([]);
    const [isEpiLoading, setIsEpiLoading] = useState(true);
    const [trustPeople, setTrustPeople] = useState([]);
    const [isTrustPeopleLoading, setIsTrustPeopleLoading] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
            let list = await chainEpiList();
            setEpi(list);
            setIsEpiLoading(false);
        };

        const fetchTrustPeople = async () => {
            let list = await constructGraph();
            setTrustPeople(list);
            setIsTrustPeopleLoading(false);
        };

        const fetchData = async () =>
            await Promise.all([fetchEpi(), fetchTrustPeople()]);

        try {
            fetchData();
        } catch (error) {
            //handle error
        }
    }, []);

    const investigateEpi = async (epiId: number) => await raiseInvestigation(epiId);
    const reportScore = async (epiId: number) => await getAggregate(epiId);

    const renderIcons = () => {
        return (
            <div className="icons">
                {!isTrustPeopleVisibile && <FontAwesomeIcon icon={faUserCircle} onClick={() => setIsTrustPeopleVisible(true)} />}
                {!isAddEpiVisible && <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: "10px" }} onClick={() => setisAddEpiVisible(true)} />}
                {!isAddTrustVisible && <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: "10px" }} onClick={() => setisAddTrustVisible(true)} />}
            </div>
        )
    }

    const tryRenderModals = () => {
        return (
            <>
                {isTrustPeopleVisibile && <TrustPeople people={trustPeople} isLoadingData={isTrustPeopleLoading} closeTrustPeople={() => setIsTrustPeopleVisible(false)} />}
                {isAddEpiVisible && <AddEpiModal closeModal={() => setisAddEpiVisible(false)} />}
                {isAddTrustVisible && <AddTrustModal closeModal={() => setisAddTrustVisible(false)} />}
            </>
        )
    }

    return (
        <div className="contentContainer">
            <EpiList
                epiList={epi}
                isLoadingData={isEpiLoading}
                investigateEpi={investigateEpi}
                reportScore={reportScore}
            />
            {renderIcons()}
            {tryRenderModals()}
        </div>
    );
};

export default Content;

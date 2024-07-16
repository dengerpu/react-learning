import React from "react";
import { Link, withRouter } from 'react-router-dom';

// 样式
import styled from "styled-components";
const HomeHeadBox = styled.nav`
    a{
        margin-right: 10px;
    }
`;

const HomeHead = function HomeHead(props) {
    console.log(props);
    return <HomeHeadBox>
        <Link to="/a">A</Link>
        <Link to="/b">B</Link>
        <Link to="/c">C</Link>
    </HomeHeadBox>;
};
export default withRouter(HomeHead);
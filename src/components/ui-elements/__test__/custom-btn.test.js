import React from 'react';
import ReactDom from 'react-dom';
import CustomBtn from '../custom-btn';
import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDom.render(<CustomBtn></CustomBtn>,div);
}); // checks that the element renders without crashing (-- Test case 04 --)

it("renders custom btn as it should be with name prop",()=>{
    const {getByTestId}=render(<CustomBtn name="test 02"></CustomBtn>);
    expect(getByTestId("cbtn")).toHaveTextContent("test 02");
}); // checks that given props functions as they should (-- Test case 05 --)

it("renders custom btn as it should be with name prop",()=>{
    const {getByTestId}=render(<CustomBtn name="test 02 dif"></CustomBtn>);
    expect(getByTestId("cbtn")).toHaveTextContent("test 02 same");
}); // checks that given props functions as they should (-- Test case 06 --) [Negative]



it("matches the snapshot",()=>{
    const tree=renderer.create(<CustomBtn name="test 02"></CustomBtn>).toJSON();
    expect(tree).toMatchSnapshot();
}); // Snap shot matcher

import React from "react";
import enzyme, { shallow } from "enzyme";
import LoginComponent from "./LoginComponent"
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe("LoginComponent Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <LoginComponent  />
            ).exists()
        ).toBe(true);
    });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Column from './Column';
import { ColumnConfig } from './types';
import { Simulate } from 'react-dom/test-utils';

describe("GridEditor Column component", () => {
    it("shows the configured width", () => {
        const config: ColumnConfig = { caption: "", width: 12345 };

        render(<Column config={config} />);

        expect(screen.getByText(/Width: 12345/i)).toBeInTheDocument();
    });

    describe("delete icon", () => {
        it("is not shown when no onDelete prop is provided", () => {
            const config: ColumnConfig = { caption: "", width: 1 };

            render(<Column config={config} />);
            expect(screen.queryByTestId("delete-cell")).toBeNull();
        });

        it("when clicked triggers calls onDelete callback ", () => {
            const onDelete = jest.fn();
            const config: ColumnConfig = { caption: "", width: 1 };

            render(<Column config={config} onDelete={onDelete} />);
            Simulate.click(screen.getByTestId("delete-cell"));

            expect(onDelete).toBeCalledTimes(1);
        });
    });
});

import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Tabs, TabsList, TabsPanel, TabsTab } from ".";

const meta = {
  title: "Components/Tabs",
  component: ({ disabledTab }: { disabledTab?: string }) => {
    console.log("disabledTab", disabledTab);

    return (
      <Tabs initialValue="base">
        <TabsList aria-label="Tabs">
          <TabsTab disabled={disabledTab === "base"} value="base">
            Base
          </TabsTab>
          <TabsTab disabled={disabledTab === "secondary"} value="secondary">
            Secondary
          </TabsTab>
        </TabsList>

        <TabsPanel value="base">
          <div>Base content</div>
        </TabsPanel>

        <TabsPanel value="secondary">
          <div>Secondary content</div>
        </TabsPanel>
      </Tabs>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabledTab: "secondary",
  },
  argTypes: {
    disabledTab: {
      control: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("tabs-tab-secondary");
    expect(button).toHaveAttribute("disabled");
  },
};

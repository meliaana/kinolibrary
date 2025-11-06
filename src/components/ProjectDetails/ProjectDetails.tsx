import { useSelector } from '@xstate/react';
import { orderDetailsActor } from '../../machines/orders.machine';
import { LabelInputPair } from '../LabelInputPair';
import { Select } from '../Select';

const ProjectDetails = ({
  projectDetailsState,
  setProjectDetailsState,
}: {
  projectDetailsState: {
    transmission: string;
    territory: string;
    platform: string;
  };
  setProjectDetailsState: (state: {
    transmission: string;
    territory: string;
    platform: string;
  }) => void;
}) => {
  const platforms = useSelector(
    orderDetailsActor,
    (state) => state.context.platforms,
  );

  const territories = useSelector(
    orderDetailsActor,
    (state) => state.context.territories,
  );

  return (
    <>
      <LabelInputPair
        label="Transmission"
        value={projectDetailsState.transmission}
        setValue={(value) =>
          setProjectDetailsState({
            ...projectDetailsState,
            transmission: value,
          })
        }
        placeholder="Enter Transmission details"
      />
      <Select
        label="Territory"
        value={projectDetailsState.territory}
        onChange={(value) =>
          setProjectDetailsState({ ...projectDetailsState, territory: value })
        }
        options={territories.map((territory) => ({
          id: territory.id,
          name: territory.name,
        }))}
      />
      <Select
        label="Platform"
        value={projectDetailsState.platform}
        onChange={(value) =>
          setProjectDetailsState({ ...projectDetailsState, platform: value })
        }
        options={platforms.map((platform) => ({
          id: platform.id,
          name: platform.name,
        }))}
      />
    </>
  );
};

export default ProjectDetails;

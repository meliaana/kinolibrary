import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { orderDetailsActor } from '../../machines/orders.machine';
import { LabelInputPair } from '../LabelInputPair';
import { Select } from '../Select';

const ProjectDetails = ({
  transmissionInital,
  territoryInitial,
  platformInitial,
}: {
  transmissionInital: string;
  territoryInitial: string;
  platformInitial: string;
}) => {
  const [transmission, setTransmission] = useState(transmissionInital);
  const [territory, setTerritory] = useState(territoryInitial);
  const [platform, setPlatform] = useState(platformInitial);
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
        value={transmission}
        setValue={setTransmission}
        placeholder="Enter Transmission details"
      />
      <Select
        label="Territory"
        value={territory}
        onChange={setTerritory}
        options={territories.map((territory) => ({
          id: territory.id,
          name: territory.name,
        }))}
      />
      <Select
        label="Platform"
        value={platform}
        onChange={setPlatform}
        options={platforms.map((platform) => ({
          id: platform.id,
          name: platform.name,
        }))}
      />
    </>
  );
};

export default ProjectDetails;

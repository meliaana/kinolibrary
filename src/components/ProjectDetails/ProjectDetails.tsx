import { useState } from 'react';
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
        options={[
          'North America',
          'Europe',
          'Asia',
          'South America',
          'Africa',
          'Australia',
          'Antarctica',
        ]}
      />
      <Select
        label="Platform"
        value={platform}
        onChange={setPlatform}
        options={['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'Chrome OS']}
      />
    </>
  );
};

export default ProjectDetails;

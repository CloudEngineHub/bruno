import { useState } from 'react';
import { saveCollectionSecurityConfig } from 'providers/ReduxStore/slices/collections/actions';
import classnames from 'classnames';
import StyledWrapper from './StyledWrapper';
import { useDispatch } from 'react-redux';

const SecuritySettings = ({ collection }) => {
  const dispatch = useDispatch();
  const [selectedAppMode, setSelectedAppMode] = useState(collection?.securityConfig?.appMode || 'developer');

  const handleAppModeChange = (e) => {
    setSelectedAppMode(e.target.value);
  };

  const handleSave = () => {
    dispatch(
      saveCollectionSecurityConfig(collection?.uid, {
        appMode: selectedAppMode,
        runtime: selectedAppMode === 'developer' ? 'vm2' : selectedAppMode === 'safe' ? 'isolated-vm' : undefined
      })
    )
      .then(() => {
        toast.success('App Mode updated successfully');
      })
      .catch((err) => console.log(err) && toast.error('Failed to update JS AppMode'));
  };

  return (
    <StyledWrapper className="flex flex-col h-full relative px-4 py-4">
      <div className='font-semibold mt-2'>Scripting Sandbox</div>

      <div className='mt-4'>
      The collection might include JavaScript code in Variables, Scripts, Tests, and Assertions.
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex flex-col">
          <label htmlFor="safe" className="flex flex-row items-center gap-2 cursor-pointer">
            <input
              type="radio"
              id="safe"
              name="appMode"
              value="safe"
              checked={selectedAppMode === 'safe'}
              onChange={handleAppModeChange}
              className="cursor-pointer"
            />
            <span className={selectedAppMode === 'safe' ? 'font-medium' : 'font-normal'}>
              Safe Mode
            </span>
            <span className='beta-tag'>BETA</span>
          </label>
          <p className='text-sm text-muted mt-1'>
            JavaScript code is executed in a secure sandbox and cannot excess your filesystem or execute system commands.
          </p>

          <label htmlFor="developer" className="flex flex-row gap-2 mt-6 cursor-pointer">
            <input
              type="radio"
              id="developer"
              name="appMode"
              value="developer"
              checked={selectedAppMode === 'developer'}
              onChange={handleAppModeChange}
              className="cursor-pointer"
            />
            <span className={selectedAppMode === 'developer' ? 'font-medium' : 'font-normal'}>
              Developer Mode
              <span className='ml-1 developer-mode-warning'>(use only if you trust the collections authors)</span>
            </span>
          </label>
          <p className='text-sm text-muted mt-1'>
            JavaScript code has access to the filesystem, can execute system commands and access sensitive information.
          </p>
        </div>
        <button onClick={handleSave} className="submit btn btn-sm btn-secondary w-fit mt-6">
          Save
        </button>
      </div>
    </StyledWrapper>
  );
};

export default SecuritySettings;
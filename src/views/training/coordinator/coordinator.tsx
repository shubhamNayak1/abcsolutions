import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/card/card';
import DialogBox from '../../../components/dialogBox/dialogBox';
import './coordinator.css';
import SearchableTable from '../../../components/table/searchableTable';
import TrainerDto from '../../../dto/trainer';
import {
  createCoordinator,
  createTrainers,
  getAllCoordinator,
  getAllTrainer,
  getAllVendor,
} from '../../../api/training';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import VendorDto from '../../../dto/vendor';
import { getAllUsers } from '../../../api/users';
import User from '../../../dto/user';
import CoordinatorDto from '../../../dto/coordinator';

const Coordinator: React.FC = () => {
  const [internalTrainer, setInternalTrainer] = useState(false);
  const [externalTrainer, setExternalTrainer] = useState(false);

  const [coordinator, setCoordinator] = useState(false);

  const handleInternalTrainerOpen = () => {
    setInternalTrainer(true);
  };
  const handleExternalTrainerOpen = () => {
    setExternalTrainer(true);
  };

  const handleCoordinatorOpen = () => {
    setCoordinator(true);
  };

  const handleCoordinatorClose = () => {
    setCoordinator(false);
  };

  const [formCoordinatorData, setFormCoordinatorData] = useState<CoordinatorDto>({
    userId: -1,
  });

  const columnsCoordinator = ['username'];
  const columnCoordinatorLabels = { username: 'Username' };

  const [dataCoordinator, setDataCoordinator] = useState<Record<string, any>[]>([]);

  const handleCoordinatorChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormCoordinatorData({ ...formCoordinatorData, [name]: value });
    console.log(name + value);
  };

  const handleCoordinatorSave = () => {
    createCoordinator(formCoordinatorData)
      .then((response: AxiosResponse) => {
        toast.success('Coordinator created successfully!');
        loadCoordinator();
        setFormCoordinatorData(emptyInternalTrainer);
      })
      .catch((error) => {
        toast.error('Error creating Coordinator. Please try again.');
      });
    handleCoordinatorClose();
  };

  const loadCoordinator = useCallback(async () => {
    try {
      const { data } = await getAllCoordinator();
      setDataCoordinator(data);
    } catch {
      console.log('error');
    }
  }, []);

  const handleInternalTrainerClose = () => {
    setInternalTrainer(false);
  };

  const handleExternalTrainerClose = () => {
    setExternalTrainer(false);
  };

  const columns = ['personName', 'emailId', 'type'];
  const columnLabels = { personName: 'Trainer Name', emailId: 'Email Id', type: 'Type' };

  const [data, setData] = useState<Record<string, any>[]>([]);

  const [vendor, setVendor] = useState<VendorDto[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const loadVendor = useCallback(async () => {
    try {
      const { data } = await getAllVendor();
      setVendor(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadTrainer = useCallback(async () => {
    try {
      const { data } = await getAllTrainer();
      setData(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadTrainer();
    loadVendor();
    loadUser();
    loadCoordinator();
  }, []);

  const [formInternalData, setFormInternalData] = useState<TrainerDto>({
    userId: -1,
    type: 'internal',
  });

  const emptyInternalTrainer: TrainerDto = {
    userId: -1,
    type: 'internal',
  };

  const handleInternalTrainerSave = () => {
    createTrainers(formInternalData)
      .then((response: AxiosResponse) => {
        toast.success('Internal Trainer created successfully!');
        loadTrainer();
        setFormInternalData(emptyInternalTrainer);
      })
      .catch((error) => {
        toast.error('Error creating Training Type. Please try again.');
      });
    handleInternalTrainerClose();
  };

  const [formExternalData, setFormExternalData] = useState<TrainerDto>({
    personName: '',
    vendorId: -1,
    mobileNo: '',
    emailId: '',
    type: 'external',
  });

  const emptyExternalTrainer: TrainerDto = {
    personName: '',
    vendorId: -1,
    mobileNo: '',
    emailId: '',
    type: 'external',
  };

  const handleExternalTrainerSave = () => {
    createTrainers(formExternalData)
      .then((response: AxiosResponse) => {
        toast.success('Internal Trainer created successfully!');
        loadTrainer();
        setFormExternalData(emptyExternalTrainer);
      })
      .catch((error) => {
        toast.error('Error creating Training Type. Please try again.');
      });
    handleExternalTrainerClose();
  };

  const handleInternalChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInternalData({ ...formInternalData, [name]: value });
    console.log(name + value);
  };

  const handleExternalChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormExternalData({ ...formExternalData, [name]: value });
    console.log(name + value);
  };

  return (
    <>
      <div className="coordinator">
        <div className="header-band">Coordinator</div>
        <Card>
          <div className="allbutton">
            <div className="saveButtonCoordinator">
              <button onClick={() => handleCoordinatorOpen()}>Create Co-ordinator</button>
            </div>
            <div className="saveButtonCoordinator">
              <button onClick={() => handleInternalTrainerOpen()}>Create Internal Trainer</button>
            </div>
            <div className="saveButtonCoordinator">
              <button onClick={() => handleExternalTrainerOpen()}>Create External Trainer</button>
            </div>
          </div>
          <div className="header-band">Trainer</div>
          <div>
            <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
          </div>
        </Card>
        <Card>
          <div className="header-band">Coordinator</div>
          <div>
            <SearchableTable
              columnLabels={columnCoordinatorLabels}
              columns={columnsCoordinator}
              data={dataCoordinator}
            />
          </div>
        </Card>
        <DialogBox
          isOpen={internalTrainer}
          onClose={handleInternalTrainerClose}
          onSave={handleInternalTrainerSave}
          title={'Create Internal Trainer'}
        >
          <div className="createCoordinatorBody">
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Trainer Name</div>
              <div>
                <select
                  name="userId"
                  value={formInternalData.userId}
                  onChange={handleInternalChange}
                >
                  <option value="">Select Trainer</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </DialogBox>
        <DialogBox
          isOpen={externalTrainer}
          onClose={handleExternalTrainerClose}
          onSave={handleExternalTrainerSave}
          title={'Create External Trainer'}
        >
          <div className="createCoordinatorBody">
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Vendor Name</div>
              <div>
                <select
                  name="vendorId"
                  value={formExternalData.vendorId}
                  onChange={handleExternalChange}
                >
                  <option value="">Select Vendor</option>
                  {vendor.map((ven) => (
                    <option key={ven.id} value={ven.id}>
                      {ven.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Person Name</div>
              <div>
                <input
                  type="text"
                  name="personName"
                  id="personName"
                  value={formExternalData.personName}
                  onChange={handleExternalChange}
                />
              </div>
            </div>
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Contact No.</div>
              <div>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  value={formExternalData.mobileNo}
                  onChange={handleExternalChange}
                />
              </div>
            </div>
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Email Id</div>
              <div>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  value={formExternalData.emailId}
                  onChange={handleExternalChange}
                />
              </div>
            </div>
          </div>
        </DialogBox>
        <DialogBox
          isOpen={coordinator}
          onClose={handleCoordinatorClose}
          onSave={handleCoordinatorSave}
          title={'Create Co-ordinator'}
        >
          <div className="createCoordinatorBody">
            <div className="createCoordinatorBodyrow">
              <div className="createCoordinatorBodyrowlabel">Coordinator Name</div>
              <div>
                <select
                  name="userId"
                  value={formCoordinatorData.userId}
                  onChange={handleCoordinatorChange}
                >
                  <option value="">Select Coordinator</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </DialogBox>
      </div>
    </>
  );
};

export default Coordinator;

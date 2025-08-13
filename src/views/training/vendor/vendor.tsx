import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/card/card';
import './vendor.css';
import SearchableTable from '../../../components/table/searchableTable';
import { createVendor, getAllVendor } from '../../../api/training';
import VendorDto from '../../../dto/vendor';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const Vendor: React.FC = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);

  const [formVendorData, setFormVendorData] = useState<VendorDto>({
    name: '',
    address: '',
  });

  const emptyForm: VendorDto = {
    name: '',
    address: '',
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormVendorData({ ...formVendorData, [name]: value });
  };

  const handleTrainingVendorSave = () => {
    createVendor(formVendorData)
      .then((response: AxiosResponse) => {
        toast.success('Vendor created successfully!');
        loadVendor();
        setFormVendorData(emptyForm);
      })
      .catch((error) => {
        toast.error('Error creating vendor. Please try again.');
      });
  };

  const columns = ['name', 'address'];
  const columnLabels = { name: 'Vendor Name', address: 'Address' };

  const loadVendor = useCallback(async () => {
    try {
      const { data } = await getAllVendor();
      setData(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadVendor();
  }, []);

  return (
    <>
      <div className="vendor">
        <div className="header-band">Vendor</div>
        <Card>
          <div className="createVendorHeader">Vendor Add</div>
          <div className="createVendorBody">
            <div className="createVendorBodyrow">
              <div className="createVendorBodyrowlabel">Vendor Name</div>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formVendorData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createVendorBodyrow">
              <div className="createVendorBodyrowlabel">Address</div>
              <div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formVendorData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="saveButtonVendor">
              <div>
                <button onClick={handleTrainingVendorSave}> Save </button>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
        </Card>
      </div>
    </>
  );
};

export default Vendor;

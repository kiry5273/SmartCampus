import React, { useState, useRef, useMemo, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Input, Drawer, Toolbar } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreateIcon from '@material-ui/icons/Create'
import StorefrontIcon from '@material-ui/icons/Storefront'
import BusinessIcon from '@material-ui/icons/Business'
import ApartmentIcon from '@material-ui/icons/Apartment'
import DescriptionIcon from '@material-ui/icons/Description'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Picker from 'react-mobile-picker-scroll'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import tagData from 'constants/tagData'
import {
  useMissionValue,
  MissionStep,
  floorMapping
} from '../../../../../../utils/contexts/MissionContext'
import ImageUpload from '../../../../../../utils/functions/ImageUpload'
import {
  facilitySubType,
  missionName
} from '../../../../../../constants/missionInfo'
import PicturePreview from './PicturePreview'
import CustomButton from '../../../../../../components/CustomButton'

function MissionStep2() {
  const {
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
    handleSetStep,
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages,
    missionType,
    floor,
    setFloor,
    status,
    setStatus,
    isInEdit,
    remindOpen
  } = useMissionValue()
  const [locationFocus, setLocationFocus] = useState(true)
  const [floorDrawer, setFloorDrawer] = useState(false)
  const [statusDrawer, setStatusDrawer] = useState(false)
  const [floorChoose, setFloorChoose] = useState(false)
  const [statusChoose, setStatusChoose] = useState(false)
  const focusInput = useRef(null)
  const { target = [] } = useMemo(
    () =>
      facilitySubType[missionType].find(
        (facility) => facility.subTypeName === selectedMissionId
      ) || {},
    [missionType, selectedMissionId]
  )
  useEffect(() => {
    if (floor !== 0) setFloorChoose(true)
    else {
      setFloorChoose(false)
    }
  }, [floor])
  useEffect(() => {
    setStatusChoose(false)
  }, [selectedMissionId])
  useEffect(() => {
    if (status !== '請選擇') setStatusChoose(true)
    else setStatusChoose(false)
  }, [status])
  useEffect(() => {
    if (missionType !== 2) {
      setStatus(tagData[missionType][0].statusName)
    }
  }, [missionType, setStatus])
  useEffect(() => {
    if (missionType === 2) {
      setSelectedSubOptionId(status)
    }
  }, [status, setSelectedSubOptionId, missionType])
  return (
    <>
      <Grid container spacing={3}>
        {/* * ==================== 1.經緯度標註 ==================== */}
        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='70%'
            justifyContent='flex-start'
          >
            <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Typography>將座標放在要標註的位置。</Typography>
          </Box>
          <IconButton
            size='small'
            onClick={() => handleSetStep(MissionStep.PlaceFlagOnMap)}
          >
            <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
          </IconButton>
        </Grid>

        {/* * ==================== 2.地點資訊 ==================== */}
        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='100vw'
            justifyContent='flex-start'
          >
            <StorefrontIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Input
              id='standard-basic'
              ref={focusInput}
              disableUnderline={locationFocus}
              style={{ width: '100%' }}
              placeholder='輸入地點名稱'
              value={textLocation}
              onChange={handleChangeTextLocation}
              onFocus={() => {
                setLocationFocus(false)
              }}
              onBlur={() => {
                setLocationFocus(true)
              }}
            />

            <IconButton
              size='small'
              onClick={() => {
                focusInput.current.click()
              }}
            >
              <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='70vw'
            justifyContent='flex-start'
          >
            <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Typography>請選擇目標樓層</Typography>
            <Button
              onClick={() => setFloorDrawer(true)}
              variant={floorChoose ? 'contained' : 'text'}
              color='primary'
              style={{
                borderBottom: floorChoose ? '' : 'solid 1px',
                borderRadius: '0',
                marginLeft: '10px',
                color: 'black'
              }}
            >
              {floorMapping[floor] || floor}
              <UnfoldMoreIcon size='small' />
            </Button>
          </Box>
        </Grid>

        {/* * ==================== 設施類型選擇 ==================== */}
        <Grid container item xs={12} direction='row'>
          <>
            {remindOpen === true && selectedMissionId === '' ? (
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                width='1/2'
                justifyContent='flex-start'
                border={1}
                borderColor='error.main'
                borderRadius={6}
              >
                <BusinessIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
                <Typography>{missionName[missionType].missionName}</Typography>
                <Typography>（必填選項）</Typography>
              </Box>
            ) : (
              <>
                <BusinessIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
                <Typography>{missionName[missionType].missionName}</Typography>
              </>
            )}
          </>
        </Grid>
        {facilitySubType[missionType].map((facility) => (
          <Grid key={facility.subTypeName} item xs={4}>
            <CustomButton
              onClick={() => handleSetSelectedMissionId(facility.subTypeName)}
              buttonType={
                selectedMissionId === facility.subTypeName
                  ? 'boxButton_activated'
                  : 'boxButton_inactivated'
              }
              variant='contained'
              size='small'
              fullWidth
            >
              {facility.subTypeName}
            </CustomButton>
          </Grid>
        ))}
        {/* * ==================== 具體設施子類別 ==================== */}
        <Grid container item xs={12} direction='row'>
          <>
            {missionType === 2 ? (
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                width='100vw'
                justifyContent='flex-start'
              >
                {remindOpen === true && status === '請選擇' ? (
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    width='1/2'
                    justifyContent='flex-start'
                    border={1}
                    borderColor='error.main'
                    borderRadius={6}
                  >
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>請選擇目前狀態</Typography>
                    <Typography>（必填選項）</Typography>
                  </Box>
                ) : (
                  <>
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>請選擇目前狀態</Typography>
                  </>
                )}
                <Button
                  onClick={() => setStatusDrawer(true)}
                  variant={statusChoose ? 'contained' : 'text'}
                  color='primary'
                  style={{
                    borderBottom: statusChoose ? '' : 'solid 1px',
                    borderRadius: '0',
                    marginLeft: '10px',
                    color: 'black'
                  }}
                >
                  {status}
                  <UnfoldMoreIcon size='small' />
                </Button>
              </Box>
            ) : (
              <>
                {remindOpen === true && selectedSubOptionId === '' ? (
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    width='1/2'
                    justifyContent='flex-start'
                    border={1}
                    borderColor='error.main'
                    borderRadius={6}
                  >
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>
                      {missionName[missionType].missionDescription}
                    </Typography>
                    <Typography>（必填選項）</Typography>
                  </Box>
                ) : (
                  <>
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>
                      {missionName[missionType].missionDescription}
                    </Typography>
                  </>
                )}
              </>
            )}
          </>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {missionType === 2 ? (
              ''
            ) : (
              <>
                {target.map((discovery) => (
                  <Grid
                    key={discovery.targetName}
                    id={discovery.targetName}
                    item
                    xs={4}
                  >
                    <CustomButton
                      variant='contained'
                      fullWidth
                      size='small'
                      buttonType={
                        selectedSubOptionId === discovery.targetName
                          ? 'boxButton_activated'
                          : 'boxButton_inactivated'
                      }
                      onClick={() =>
                        setSelectedSubOptionId(discovery.targetName)
                      }
                    >
                      {discovery.targetName}
                    </CustomButton>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        {!isInEdit && (
          <>
            {missionType === 2 ? (
              ''
            ) : (
              <Grid container item xs={12} direction='row'>
                <DescriptionIcon
                  style={{ color: 'FDCC4F', marginRight: '5px' }}
                />
                <TextField
                  name='moreDescriptionText'
                  multiline
                  id='standard-basic'
                  style={{ width: '80vw' }}
                  placeholder='詳細說明'
                  value={moreDescriptionText}
                  onChange={handleChangeMoreDescriptionText}
                />
              </Grid>
            )}
          </>
        )}

        {/* * ==================== 7.上傳照片 ==================== */}
        <Grid container item xs={12} direction='row' alignItems='center'>
          <AddAPhotoIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
          <ImageUpload
            setPreviewImages={setPreviewImages}
            previewImages={previewImages}
          />
        </Grid>
        {/* <Grid container item xs={12} direction='row' alignItems='center'>
        <img src={previewImages} />
      </Grid> */}
        <PicturePreview
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Grid>
      <Drawer
        anchor='bottom'
        open={floorDrawer}
        onClose={() => {
          setFloorDrawer(false)
        }}
        PaperProps={{
          style: {
            borderRadius: '20px 20px 0 0',
            backgroundColor: '#FAFAFA',
            height: '50vh'
          }
        }}
      >
        <Toolbar
          style={{
            position: 'sticky',
            top: '0',
            zIndex: '100',
            backgroundColor: '#FAFAFA'
          }}
        >
          <Typography variant='h6'>選擇樓層</Typography>
          <Button
            color='primary'
            onClick={() => {
              setFloorDrawer(false)
            }}
            style={{ position: 'absolute', right: '10px' }}
          >
            確定
          </Button>
        </Toolbar>
        <Picker
          valueGroups={{
            floor: floorMapping[floor]
          }}
          optionGroups={{
            floor: floorMapping
          }}
          onChange={(name, value) => {
            setFloor(floorMapping.indexOf(value))
          }}
        />
      </Drawer>
      <Drawer
        anchor='bottom'
        open={statusDrawer}
        onClose={() => {
          setStatusDrawer(false)
        }}
        PaperProps={{
          style: {
            borderRadius: '20px 20px 0 0',
            backgroundColor: '#FAFAFA',
            height: '50vh'
          }
        }}
      >
        <Toolbar
          style={{
            position: 'sticky',
            top: '0',
            zIndex: '100',
            backgroundColor: '#FAFAFA'
          }}
        >
          <Typography variant='h6'>選擇狀態</Typography>
          <Button
            color='primary'
            onClick={() => {
              setStatusDrawer(false)
            }}
            style={{ position: 'absolute', right: '10px' }}
          >
            確定
          </Button>
        </Toolbar>
        {selectedMissionId === 'Wi-Fi 訊號' ? (
          <Picker
            valueGroups={{
              status
            }}
            optionGroups={{
              status: ['良好', '正常', '微弱']
            }}
            onChange={(name, value) => {
              setStatus(value)
            }}
          />
        ) : (
          <Picker
            valueGroups={{
              status
            }}
            optionGroups={{
              status: ['人少', '人稍多', '擁擠']
            }}
            onChange={(name, value) => {
              setStatus(value)
            }}
          />
        )}
      </Drawer>
    </>
  )
}

export default MissionStep2

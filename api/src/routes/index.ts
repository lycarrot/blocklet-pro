import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import Services from '../services';
import multer from 'multer';

const storage = multer.diskStorage({
  //@ts-ignore
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  //@ts-ignore
  filename: function (req, file, cb) {
    const name = file.originalname.split('/').reverse()[0];
    cb(null, Date.now() + '-' + name);
  },
});
const upload = multer({ storage: storage });

const router = Router();

//@ts-ignore
router.get('/user/detail', async (req, res) => {
  try {
    let userId = req.query.id || '';
    let user = await Services.User.findUser(userId);
    if (user) {
      res.json({
        code: 1,
        data: user,
        message: 'success',
      });
    } else {
      res.status(500).json({
        code: 0,
        data: null,
        message: 'The user was not found',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: 'response fail',
    });
  }
});

router.post('/user/edit', middleware.user(), async (req, res) => {
  try {
    let userId = req.query.id || '';
    await Services.User.updateUser(userId, {
      ...req.body,
    });
    res.json({
      code: 1,
      message: 'update success',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: 'update fail',
    });
  }
});

router.post('/user/upload', upload.single('file'), async (req, res) => {
  try {
    const userId = Number(req.query.id);
    const path = req.file?.path as string;
    const avatarUrl = `/${path.split('/').reverse()[0]}`;
    await Services.User.updateUser(userId, { avater: avatarUrl });
    res.json({
      code: 1,
      data: {
        url: avatarUrl,
      },
      message: 'update success',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: 'upload fail',
    });
  }
});

export default router;
